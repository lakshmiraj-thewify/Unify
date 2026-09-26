'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { primaryNav } from '@/content/nav'
import { Menu, X, Radio } from 'lucide-react'
import { Dock, DockIcon } from '@/registry/magicui/dock'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${scrolled ? 'unify-glass-nav py-3' : 'bg-transparent py-5'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] shadow-lg shadow-[#743CFF]/30 transition-transform group-hover:scale-105">
            <Radio className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">Unify</span>
              <span className="rounded bg-[#5EE7E4]/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#5EE7E4] uppercase">
                Wi-Fi
              </span>
            </div>
            <span className="-mt-1 text-[10px] font-medium text-white/40">by TheWiFy</span>
          </div>
        </Link>

        {/* Desktop Navigation Links — with Dock Magnification Effect */}
        <Dock
          direction="middle"
          className="mt-0 hidden h-auto gap-1 border-transparent bg-transparent p-0 text-sm font-medium text-white/80 backdrop-blur-none md:flex"
        >
          {primaryNav.map((item) => (
            <DockIcon key={item.label} asPill size={36} magnification={42} distance={90}>
              <Link
                href={item.href}
                className="block rounded-full px-3 py-1.5 whitespace-nowrap transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </DockIcon>
          ))}
        </Dock>

        {/* Action Buttons (Right) with Dock Magnification */}
        <Dock
          direction="middle"
          className="mt-0 hidden h-auto items-center gap-3 border-transparent bg-transparent p-0 backdrop-blur-none lg:flex"
        >
          <DockIcon asPill size={36} magnification={40} distance={70}>
            <Link
              href="/contact"
              className="block px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white/70 transition-colors hover:text-white"
            >
              Sign in
            </Link>
          </DockIcon>

          <DockIcon asPill size={36} magnification={40} distance={70}>
            <Link
              href="/contact"
              className="block rounded-full border border-white/20 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Talk to sales
            </Link>
          </DockIcon>

          <DockIcon asPill size={36} magnification={40} distance={70}>
            <InteractiveHoverButton
              href="/contact"
              variant="white"
              className="text-sm font-semibold whitespace-nowrap"
            >
              Book a demo
            </InteractiveHoverButton>
          </DockIcon>
        </Dock>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="unify-glass-nav space-y-4 border-b border-white/10 px-6 py-6 md:hidden">
          <div className="flex flex-col space-y-3 text-base font-medium text-white/80">
            {primaryNav.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full border border-white/20 py-2.5 text-center font-medium text-white"
            >
              Talk to sales
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-white py-2.5 text-center font-semibold text-[#0D0F17]"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
