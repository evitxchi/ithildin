'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu-1'

const RESOURCES: { title: string; href: string; description: string }[] = [
  { title: 'Careers', href: '/careers', description: 'Open roles and how we hire.' },
  { title: 'Blog', href: '/blog', description: 'Notes on litigation and the record.' },
  { title: 'Onboarding', href: '/onboarding', description: 'Get your firm set up on Ithildin.' },
  { title: 'Help Center', href: '/help-center', description: 'Guides, answers, and support.' },
  { title: 'Privacy', href: '/privacy', description: 'How we protect your case data.' },
]

/* Trigger is a bare text link, not a shadcn pill. Overrides strip the
   default h-9/px-4/text-sm/bg-accent styling so it matches .nav-link. */
const TRIGGER_OVERRIDES =
  'nav-link !h-auto !w-auto !rounded-none !px-1 !py-2 -mx-1 -my-2 !text-[0.82rem] !font-normal !bg-transparent ' +
  'hover:!bg-transparent focus:!bg-transparent data-[popup-open]:!bg-transparent'

function ResourcesMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="!gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={TRIGGER_OVERRIDES}>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="!p-2 xs:!min-w-[300px]">
            <ul className="grid w-full gap-1 sm:w-[300px]">
              {RESOURCES.map(item => (
                <li key={item.title}>
                  <NavigationMenuLink render={<Link href={item.href} />} className="!gap-1 !p-3">
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        color: 'var(--white)',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        fontWeight: 300,
                        color: 'var(--text-dim)',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPositioner className="z-[200]">
        <NavigationMenuPopup />
      </NavigationMenuPositioner>
    </NavigationMenu>
  )
}

/* `onDark` marks a page whose masthead is a dark image in both themes — the nav
   then keeps its dark-mode colours until it scrolls off that hero. */
export default function Nav({ onDark = false }: { onDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Close the mobile panel after navigating, and if the viewport grows to
     desktop where the burger no longer exists. */
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <nav className={onDark && !scrolled ? 'nav-on-dark' : undefined} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'var(--bg-nav-scrolled)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? 'var(--border-nav-scrolled)' : 'transparent'}`,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <Link href="/" className="nav-brand" style={{
        display: 'flex', alignItems: 'center', gap: 2,
        fontFamily: 'var(--font-serif)',
        fontSize: '1.25rem',
        fontWeight: 400,
        color: 'var(--white)',
        textDecoration: 'none',
        letterSpacing: '0.01em',
      }}>
        <img className="nav-logo" src="/ithildinlogo.png" alt="Ithildin logo" style={{ height: 62, width: 'auto' }} />
        <span className="nav-wordmark">Ithildin</span>
      </Link>

      {/* Center links */}
      <div className="nav-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 36 }}>
        <Link href="/product" className="nav-link">Product</Link>
        <ResourcesMenu />
        <Link href="/mission" className="nav-link">Mission</Link>
      </div>

      {/* Right: theme toggle + Login + Book a Demo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <ThemeToggle />
        <Link href="/login" className="nav-link nav-link-login">
          Login
        </Link>
        <Link href="/demo" className="btn btn-solid nav-demo-cta">
          Book a Demo
        </Link>
        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile panel. The burger only exists under 768px, so this only opens there. */}
      {menuOpen && (
        <div className="nav-mobile-panel">
          <Link href="/product" className="nav-mobile-link">Product</Link>
          <Link href="/mission" className="nav-mobile-link">Mission</Link>
          <span className="nav-mobile-heading">Resources</span>
          {RESOURCES.map(item => (
            <Link key={item.title} href={item.href} className="nav-mobile-link nav-mobile-link--sub">
              {item.title}
            </Link>
          ))}
          <span className="nav-mobile-rule" />
          <Link href="/login" className="nav-mobile-link">Login</Link>
        </div>
      )}
    </nav>
  )
}
