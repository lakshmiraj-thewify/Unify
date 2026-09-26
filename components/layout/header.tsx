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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'unify-glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] flex items-center justify-center shadow-lg shadow-[#743CFF]/30 group-hover:scale-105 transition-transform">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Unify</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5EE7E4] bg-[#5EE7E4]/10 px-1.5 py-0.5 rounded">Wi-Fi</span>
            </div>
            <span className="text-[10px] text-white/40 -mt-1 font-medium">by TheWiFy</span>
          </div>
        </Link>

        {/* Desktop Navigation Links — with Dock Magnification Effect */}
        <Dock
          direction="middle"
          className="hidden md:flex mt-0 h-auto border-transparent bg-transparent p-0 gap-1 backdrop-blur-none text-sm font-medium text-white/80"
        >
          {primaryNav.map((item) => (
            <DockIcon
              key={item.label}
              asPill
              size={36}
              magnification={42}
              distance={90}
            >
              <Link
                href={item.href}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap block"
              >
                {item.label}
              </Link>
            </DockIcon>
          ))}
        </Dock>

        {/* Action Buttons (Right) with Dock Magnification */}
        <Dock
          direction="middle"
          className="hidden lg:flex mt-0 h-auto border-transparent bg-transparent p-0 gap-3 backdrop-blur-none items-center"
        >
          <DockIcon asPill size={36} magnification={40} distance={70}>
            <Link 
              href="/contact" 
              className="text-sm font-medium text-white/70 hover:text-white px-3 py-1.5 transition-colors whitespace-nowrap block"
            >
              Sign in
            </Link>
          </DockIcon>
          
          <DockIcon asPill size={36} magnification={40} distance={70}>
            <Link
              href="/contact"
              className="text-sm font-medium text-white px-4 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all whitespace-nowrap block"
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
          className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden unify-glass-nav border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-white/80">
            {primaryNav.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full border border-white/20 text-white font-medium"
            >
              Talk to sales
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-white text-[#0D0F17] font-semibold"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
