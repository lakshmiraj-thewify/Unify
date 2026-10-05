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
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-out ${
        scrolled ? 'px-4 pt-3 sm:px-6 sm:pt-4' : 'px-4 pt-5 sm:px-8'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? 'max-w-5xl rounded-full border border-white/10 bg-[#0D0F17]/85 px-4 py-2 shadow-2xl shadow-black/70 backdrop-blur-xl sm:px-6'
            : 'max-w-6xl rounded-none border border-transparent bg-transparent px-4 py-1 shadow-none sm:px-6'
        }`}
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] shadow-lg shadow-[#743CFF]/30 transition-transform group-hover:scale-105">
            <Radio className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Unify</span>
        </Link>

        {/* Center: Desktop Navigation Links — Centered evenly between Logo and Action Buttons */}
        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <Dock
            direction="middle"
            className="mt-0 h-auto items-center gap-2 border-transparent bg-transparent p-0 text-[15px] font-medium text-white/85 backdrop-blur-none lg:gap-3.5"
          >
            {primaryNav.map((item) => (
              <DockIcon key={item.label} asPill size={40} magnification={46} distance={100}>
                <Link
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-[15px] font-medium tracking-wide whitespace-nowrap text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </DockIcon>
            ))}
          </Dock>
        </div>

        {/* Right: Action Buttons */}
        <div className="hidden shrink-0 items-center lg:flex">
          <Dock
            direction="middle"
            className="mt-0 h-auto items-center gap-3 border-transparent bg-transparent p-0 backdrop-blur-none"
          >
            <DockIcon asPill size={40} magnification={44} distance={70}>
              <Link
                href="/contact"
                className="block rounded-full border border-white/20 px-4.5 py-2 text-sm font-medium whitespace-nowrap text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Talk to sales
              </Link>
            </DockIcon>

            <DockIcon asPill size={40} magnification={44} distance={70}>
              <InteractiveHoverButton
                href="/contact#demo-block"
                variant="white"
                className="px-5 py-2 text-sm font-semibold whitespace-nowrap"
              >
                Book a demo
              </InteractiveHoverButton>
            </DockIcon>
          </Dock>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-lg space-y-4 rounded-3xl border border-white/10 bg-[#0D0F17]/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col space-y-3 text-base font-medium text-white/80">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 border-t border-white/10 pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full border border-white/20 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Talk to sales
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-white py-2.5 text-center text-sm font-semibold text-[#0D0F17] transition-all hover:bg-white/90"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
