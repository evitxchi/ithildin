"use client"

import { cn } from "@/lib/utils"

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon,
  title = "Stage",
  description = "Description",
  date = "Now",
  titleClassName,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border px-4 py-3 transition-all duration-700 display-card-fade [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
    >
      <div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', padding: 6,
          background: 'rgba(200,169,110,0.15)',
        }}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}
           style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 400 }}>
          {title}
        </p>
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {description}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: 'var(--text-dim)' }}>
        {date}
      </p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  if (!cards) return null
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center animate-in fade-in-0 duration-700">
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
