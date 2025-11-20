'use client'

import { motion } from 'framer-motion'

export default function NosotrosClient() {
  return (
    <main className="min-h-screen bg-[#05030a] text-slate-100">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Glow de fondo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.22),_transparent_65%)] opacity-90" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]"
        >
          Sobre Nosotros
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          Pasión por los autos. Compromiso con las personas. En Jesús Díaz
          Automotores acompañamos cada paso de tu compra con transparencia,
          experiencia y confianza.
        </motion.p>
      </section>

      {/* TARJETAS DESTACADAS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: '10+ Años de Experiencia',
              text: 'Una década asesorando a miles de clientes en cada paso de su compra.',
              icon: '🚗',
            },
            {
              title: 'Multimarca Premium',
              text: 'Trabajamos con todas las marcas para ofrecerte opciones reales.',
              icon: '🌟',
            },
            {
              title: 'Atención Personalizada',
              text: 'No vendemos autos: acompañamos decisiones importantes.',
              icon: '🤝',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-fuchsia-800/40 bg-[#0b0a12] p-6 shadow-[0_0_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="text-xl font-semibold text-fuchsia-400">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HISTORIA / TIMELINE */}
      <section className="bg-[#0a0911] border-y border-fuchsia-800/40 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestra Historia</h2>

        <div className="mx-auto max-w-4xl space-y-10">
          {[
            {
              year: '2014',
              text: 'Nacemos como un proyecto familiar con la idea de profesionalizar la compra/venta local.',
            },
            {
              year: '2018',
              text: 'Ampliamos nuestro stock y sumamos vehículos seleccionados multimarca.',
            },
            {
              year: '2022',
              text: 'Digitalizamos el catálogo y los procesos internos para mejorar la experiencia del cliente.',
            },
            {
              year: '2025',
              text: 'Integramos Mercado Libre y herramientas tecnológicas de última generación.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-4"
            >
              <span className="text-fuchsia-400 text-xl font-bold w-20">
                {item.year}
              </span>
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            'Transparencia total en cada operación.',
            'Asesoramiento profesional sin compromisos.',
            'Vehículos seleccionados uno por uno.',
            'Publicaciones conectadas y actualizadas.',
            'Financiación, trámites y transferencias.',
            'Acompañamiento real antes, durante y después.',
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-fuchsia-400 text-xl">✔</span>
              <p className="text-slate-300 text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-20">
        <h3 className="text-2xl font-semibold mb-3">¿Querés tu próximo auto?</h3>
        <p className="text-slate-400 mb-6">
          Estamos para ayudarte a elegir la mejor opción.
        </p>
        <a
          href="https://wa.me/5492494621182"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-white font-semibold shadow-lg shadow-fuchsia-800/40 hover:bg-fuchsia-500 transition"
        >
          💬 Consultanos por WhatsApp
        </a>
      </section>
    </main>
  )
}
