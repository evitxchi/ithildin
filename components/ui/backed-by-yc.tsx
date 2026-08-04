"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export const Component = () => {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = hostRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <a
      href="https://skydeck.berkeley.edu/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        ref={hostRef}
        className="relative inline-flex items-center justify-center px-2 py-2 isolate select-none"
        style={{ ["--mx" as any]: "50%", ["--my" as any]: "50%" } as React.CSSProperties}
      >
        {/* California Gold ambient glow, follows cursor */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full blur-2xl bg-[radial-gradient(160px_80px_at_var(--mx)_var(--my),rgba(253,181,21,0.28),transparent_70%)]" />
        </div>

        {/* Gleaming silver border, rotating conic shimmer */}
        <div style={{ position: 'relative', borderRadius: 9999, padding: 1, display: 'inline-flex' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              inset: '-100%',
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(160,160,160,0.4) 45deg, rgba(255,255,255,0.88) 80deg, rgba(200,200,200,0.5) 115deg, transparent 165deg)',
              animation: 'gleam-spin 3.5s linear infinite',
            }} />
          </div>

          {/* Glass pill */}
          <div
            className={cn(
              "relative z-10 rounded-full px-5 py-2",
              "backdrop-blur-xl",
              "shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            )}
            style={{ background: 'rgba(255,255,255,0.11)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium tracking-wide text-neutral-700 dark:text-white/80 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.04em' }}>
                Backed by
              </span>
              <img
                src="/skydeck-logo.png"
                alt="Berkeley SkyDeck"
                style={{ height: 18, width: 'auto', objectFit: 'contain' }}
              />
              <span aria-hidden="true" style={{ width: 1, height: 14, background: 'rgba(140,140,140,0.45)' }} />
              <span className="text-sm font-medium tracking-wide text-neutral-700 dark:text-white/80 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, letterSpacing: '0.04em' }}>
                Pad13
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}
