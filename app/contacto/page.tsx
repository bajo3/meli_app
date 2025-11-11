import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Mi Concesionario',
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Contacto
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-center text-slate-300">
          ¿Tenés alguna consulta? Estamos para ayudarte. Podes comunicarte con
          nosotros por teléfono, correo o visitarnos en nuestra oficina.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact information */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-fuchsia-400">
                Datos de contacto
              </h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Dirección:</strong> Piedrabuena 1578, Tandil
                </li>
                <li>
                  <strong>Teléfonos:</strong>{' '}
                  <a href="tel:+542494587046" className="text-fuchsia-400 hover:underline">
                    2494 587046
                  </a>
                  ,{' '}
                  <a href="tel:+542494541756" className="text-fuchsia-400 hover:underline">
                    2494 541756
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:jesusdiazautomotores@gmail.com"
                    className="text-fuchsia-400 hover:underline"
                  >
                    jesusdiazautomotores@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 text-2xl font-semibold text-fuchsia-400">
                Redes sociales
              </h2>
              <ul className="flex gap-4 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/jesusdiazautomotores"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/jesusdiazautomotores"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5492494587046"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Map iframe */}
          <div className="h-64 overflow-hidden rounded-lg shadow-md shadow-black/50">
            {/* The iframe shows the location using Google Maps embed. */}
            <iframe
              title="Ubicación"
              src="https://maps.google.com/maps?q=Piedrabuena%201578%20Tandil&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
