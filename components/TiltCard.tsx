// components/TiltCard.tsx
"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import React from "react"

export default function TiltCard({
  title, price, cover, previews = []
}: { title:string; price:string; cover:string; previews?:string[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useTransform(my, [-50, 50], [8, -8])
  const ry = useTransform(mx, [-50, 50], [-8, 8])

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect(); if (!r) return
    mx.set(e.clientX - (r.left + r.width/2)); my.set(e.clientY - (r.top + r.height/2))
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove} onMouseLeave={()=>{mx.set(0);my.set(0)}}
      style={{ rotateX: rx, rotateY: ry }}
      className="group relative rounded-3xl border border-white/10 bg-black/40 p-3 shadow-xl [transform-style:preserve-3d]"
    >
      {/* Shine */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100"
           style={{
             background: "radial-gradient(400px 160px at calc(50% + var(--mx,0px)) calc(50% + var(--my,0px)), rgba(255,255,255,0.18), transparent 60%)"
           }}/>
      {/* Cover */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image src={cover} alt={title} fill className="object-cover" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-slate-100 font-semibold">{title}</h3>
        <span className="rounded-lg bg-fuchsia-600/20 px-2 py-1 text-fuchsia-200 text-xs font-bold">{price}</span>
      </div>

      {/* Filmstrip al hover */}
      {previews?.length > 0 && (
        <div className="pointer-events-none absolute -bottom-6 left-3 right-3 hidden translate-y-2 gap-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          {previews.slice(0,3).map((src, i)=>(
            <div key={i} className="relative h-14 flex-1 overflow-hidden rounded-lg border border-white/10">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        article:hover { --mx:${mx.get()}px; --my:${my.get()}px; }
      `}</style>
    </motion.article>
  )
}
