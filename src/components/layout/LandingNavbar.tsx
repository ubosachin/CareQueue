'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Menu, X, ChevronRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Solutions', href: '/#solutions' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Pitch Deck', href: '/slides' },
  ];

  return (
    <>
      <nav 
        style={{ 
          height: isScrolled ? '70px' : '90px', 
          padding: '0 5%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: isScrolled ? 'rgba(var(--background-rgb, 255, 255, 255), 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottom: isScrolled ? '1px solid var(--sidebar-border)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            style={{ 
              background: 'var(--primary)', 
              padding: '0.5rem', 
              borderRadius: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)'
            }}
          >
            <Stethoscope size={22} color="white" />
          </motion.div>
          <span 
            className="gradient-text" 
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              letterSpacing: '-0.03em' 
            }}
          >
            CareQueue
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="mobile-hide" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} style={{ textDecoration: 'none' }}>
              <motion.span 
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 600, 
                  color: 'var(--foreground)', 
                  opacity: 0.7,
                  position: 'relative'
                }}
                whileHover={{ opacity: 1, y: -2 }}
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
          <Link href="/dashboard">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{
                padding: '0.75rem 1.75rem',
                fontSize: '0.9rem',
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <LayoutDashboard size={16} />
              <span>Launch Dashboard</span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-only">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'rgba(var(--primary-rgb, 37, 99, 235), 0.1)', 
              border: 'none', 
              padding: '0.65rem', 
              borderRadius: '0.75rem', 
              color: 'var(--primary)',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '1rem',
              right: '1rem',
              background: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              zIndex: 999,
              border: '1px solid var(--sidebar-border)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)' }}>{link.name}</span>
                <ChevronRight size={18} opacity={0.3} />
              </Link>
            ))}
            <div style={{ height: '1px', background: 'var(--sidebar-border)', margin: '0.5rem 0' }} />
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              >
                <LayoutDashboard size={20} />
                <span>Launch Dashboard</span>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
