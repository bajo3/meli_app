// lib/meliImage.ts
//
// Las imagenes de Mercado Libre ya vienen de un CDN (mlstatic.com) que sirve
// varios tamanios segun un sufijo en el nombre del archivo. Pasarlas ademas por
// el optimizador de Vercel es pagar dos veces: cada combinacion unica de
// (src + width + quality + format) cuenta como 1 "Image Optimization Transformation"
// contra la cuota del plan.
//
// Estrategia:
//   1. Pedirle a ML el tamanio correcto via sufijo (gratis, no cuenta cuota).
//   2. Servirla con `unoptimized` para que Vercel no la re-procese (0 transformaciones).
//
// Los assets locales (/public) siguen pasando por el optimizador: son pocos y fijos.

/**
 * Sufijos de tamanio que expone mlstatic para cada picture.
 *
 * IMPORTANTE: la mayoria de los sufijos (-V, -W, -L, -B, -C...) devuelven un
 * CUADRADO con bandas blancas arriba y abajo (ej: -V = 320x320 conteniendo una
 * foto de 320x180). Con `object-cover` eso recorta bandas y ademas desperdicia
 * pixeles. Solo -A / -O / -F respetan el aspect ratio original de la foto:
 *
 *   -A -> ~228px de ancho
 *   -O -> ~500px de ancho   (con prefijo 2X_ -> ~1000px)
 *   -F -> ~1200px de ancho  (el que usa la galeria de ML)
 *
 * Cambiar esto NO afecta la cuota: al ir con `unoptimized`, ninguna de estas
 * variantes consume transformaciones de Vercel.
 */
const MELI_SUFFIX = {
  /** ~228px - miniaturas del strip / lightbox (cajas de 80-128px CSS) */
  thumb: '-A',
  /** ~1000px (2X_-O) - cards de catalogo y grillas, nitidas en retina */
  card: '-O',
  /** ~1200px - foto principal y lightbox a pantalla completa */
  full: '-F',
} as const;

/** Variantes que se piden con el prefijo `2X_` para duplicar la resolucion. */
const MELI_SCALE_2X: Record<MeliVariant, boolean> = {
  thumb: false,
  card: true,
  full: false,
};

export type MeliVariant = keyof typeof MELI_SUFFIX;

/** true si la URL la sirve el CDN de Mercado Libre. */
export function isMeliImage(src: unknown): src is string {
  return typeof src === 'string' && /(^https?:)?\/\/[^/]*mlstatic\.com\//i.test(src);
}

/**
 * Aplica o quita el prefijo `2X_` del nombre del archivo.
 *
 * El filename siempre arranca con `D_`, seguido de flags opcionales de dos
 * letras (`NQ_`, `NP_`), y despues el id de la foto:
 *
 *   /D_623008-MLA115012360859_072026-O.jpg
 *   /D_NQ_NP_2X_623008-MLA115012360859_072026-O.jpg
 */
function withScale2X(src: string, enabled: boolean): string {
  // Primero normalizamos: sacamos el 2X_ que ya pudiera venir.
  const base = src.replace(/(\/D_(?:[A-Z]{2}_)*)2X_/i, '$1');
  if (!enabled) return base;
  return base.replace(/(\/D_(?:[A-Z]{2}_)*)/i, '$12X_');
}

/**
 * Reescribe una URL de mlstatic al sufijo de tamanio pedido y fuerza `.webp`.
 *
 * mlstatic genera el webp on-demand para cualquier foto (aunque el original sea
 * jpg), y pesa ~3x menos a igual resolucion: -F.jpg ~163KB vs -F.webp ~52KB.
 * Eso es lo que permite subir de 320px a 1200px sin empeorar la carga.
 *
 *   meliImage('https://http2.mlstatic.com/D_123-MLA456_012025-O.jpg', 'full')
 *   -> 'https://http2.mlstatic.com/D_123-MLA456_012025-F.webp'
 */
export function meliImage(src: string | null | undefined, variant: MeliVariant = 'full'): string {
  if (!src) return '';
  if (!isMeliImage(src)) return src;

  const suffix = MELI_SUFFIX[variant];
  const scaled = withScale2X(src, MELI_SCALE_2X[variant]);

  // Caso normal: ya trae un sufijo de 1 letra antes de la extension.
  //   ...-O.jpg -> ...-F.webp
  const replaced = scaled.replace(
    /-[A-Z]\.(?:jpg|jpeg|png|webp)(\?.*)?$/i,
    (_m, qs) => `${suffix}.webp${qs ?? ''}`,
  );
  if (replaced !== scaled) return replaced;

  // Fallback: la URL no traia sufijo -> lo insertamos antes de la extension.
  return scaled.replace(
    /\.(?:jpg|jpeg|png|webp)(\?.*)?$/i,
    (_m, qs) => `${suffix}.webp${qs ?? ''}`,
  );
}

/** Version en lote. */
export function meliImages(srcs: unknown, variant: MeliVariant = 'full'): string[] {
  if (!Array.isArray(srcs)) return [];
  return srcs.filter((s): s is string => typeof s === 'string').map((s) => meliImage(s, variant));
}
