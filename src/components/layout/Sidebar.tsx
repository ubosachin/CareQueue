'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  PlusCircle, 
  Presentation,
  ShieldAlert,
  CalendarDays,
  Menu,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/queue', label: 'Queue Mgmt', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/insights', label: 'AI Insights', icon: BrainCircuit },
  { href: '/schedule', label: 'Smart Schedule', icon: CalendarDays },
  { href: '/slides', label: 'Presentation', icon: Presentation },
  { href: '/settings', label: 'Settings', icon: Settings },
];

import { useSession, signOut } from 'next-auth/react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-toggle glass-panel"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1100,
          padding: '0.5rem',
          borderRadius: '0.5rem',
        }}
      >
        <Menu size={24} />
      </button>

      <aside className={`sidebar glass-panel ${isOpen ? 'mobile-open' : ''}`} style={{
        width: '260px',
        height: '100vh',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--sidebar-border)',
        position: 'fixed',
        transition: 'transform 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="mobile-only">
           <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
             <PlusCircle size={24} style={{ transform: 'rotate(45deg)', opacity: 0.5 }} />
          </button>
        </div>
      <div className="logo" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2.5rem',
        paddingLeft: '0.5rem'
      }}>
        <div style={{
          background: 'var(--primary)',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
          <Stethoscope size={24} color="white" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem' }}>CareQueue</h1>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} style={{ marginBottom: '0.5rem', position: 'relative' }}>
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      background: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? 'white' : 'var(--foreground)',
                      opacity: isActive ? 1 : 0.7,
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="animate-pulse-subtle" style={{
          padding: '1rem',
          background: 'rgba(255, 68, 68, 0.1)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 68, 68, 0.2)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          <ShieldAlert size={18} />
          <span>System: ACTIVE</span>
        </div>

        {session && (
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              padding: '0.75rem',
              borderRadius: '0.75rem',
              background: 'transparent',
              border: '1px solid var(--sidebar-border)',
              color: 'var(--foreground)',
              opacity: 0.6,
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            Sign Out
          </button>
        )}
      </div>
    </aside>
    </>
  );
}
