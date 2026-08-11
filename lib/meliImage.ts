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
 * Se usa `-V` (~500px) tanto en thumb como en card: es el tamanio seguro que ML
 * genera siempre para toda foto publicada. Si queres bajar bandwidth en las
 * miniaturas podes probar `-I` (~160px), pero verifica antes que no se vean
 * borrosas en pantallas retina (un thumb de 120px CSS necesita ~240px reales).
 * Cambiar esto NO afecta la cuota: al ir con `unoptimized`, ninguna de estas
 * variantes consume transformaciones de Vercel.
 */
const MELI_SUFFIX = {
  /** ~500px - miniaturas del strip / lightbox */
  thumb: '-V',
  /** ~500px - cards de catalogo y grillas */
  card: '-V',
  /** original - foto principal y lightbox a pantalla completa */
  full: '-O',
} as const;

export type MeliVariant = keyof typeof MELI_SUFFIX;

/** true si la URL la sirve el CDN de Mercado Libre. */
export function isMeliImage(src: unknown): src is string {
  return typeof src === 'string' && /(^https?:)?\/\/[^/]*mlstatic\.com\//i.test(src);
}

/**
 * Reescribe una URL de mlstatic al sufijo de tamanio pedido.
 * Si no es una URL de ML, la devuelve intacta.
 *
 *   meliImage('https://http2.mlstatic.com/D_123-MLA456_012025-O.jpg', 'thumb')
 *   -> 'https://http2.mlstatic.com/D_123-MLA456_012025-I.jpg'
 */
export function meliImage(src: string | null | undefined, variant: MeliVariant = 'full'): string {
  if (!src) return '';
  if (!isMeliImage(src)) return src;

  const suffix = MELI_SUFFIX[variant];

  // Reemplaza el sufijo de 1 letra antes de la extension: ...-O.jpg -> ...-I.jpg
  const rewritten = src.replace(/-[A-Z]\.(jpg|jpeg|png|webp)(\?.*)?$/i, (_m, ext, qs) => {
    return `${suffix}.${String(ext).toLowerCase()}${qs ?? ''}`;
  });

  return rewritten;
}

/** Version en lote. */
export function meliImages(srcs: unknown, variant: MeliVariant = 'full'): string[] {
  if (!Array.isArray(srcs)) return [];
  return srcs.filter((s): s is string => typeof s === 'string').map((s) => meliImage(s, variant));
}
