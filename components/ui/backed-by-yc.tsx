"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { GraduationCap } from "lucide-react"

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
        className={cn(
          "relative inline-flex items-center justify-center rounded-full",
          "px-2 py-2 isolate select-none"
        )}
        style={
          {
            ["--mx" as any]: "50%",
            ["--my" as any]: "50%",
          } as React.CSSProperties
        }
      >
        {/* Subtle moving glow — California Gold */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full">
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-[radial-gradient(160px_80px_at_var(--mx)_var(--my),rgba(253,181,21,0.28),transparent_70%)]",
              "blur-2xl"
            )}
          />
        </div>

        {/* Glass pill */}
        <div
          className={cn(
            "relative z-10 rounded-full px-4 py-2",
            "backdrop-blur-xl",
            "bg-white/15",
            "ring-1 ring-black/5 dark:ring-white/10",
            "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Berkeley Blue badge */}
            <span
              className={cn(
                "h-6 w-6 shrink-0 rounded-md grid place-items-center",
                "bg-[#003262]",
                "shadow-[0_2px_10px_rgba(0,50,98,0.5)]"
              )}
              aria-hidden="true"
            >
              <GraduationCap className="h-3.5 w-3.5 text-[#FDB515]" strokeWidth={2} />
            </span>
            <span className="text-sm font-medium tracking-wide text-neutral-800 dark:text-white">
              Berkeley SkyDeck
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
