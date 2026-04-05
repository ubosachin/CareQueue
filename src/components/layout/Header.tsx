'use client';

import React from 'react';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = React.useState(false);

  // Get initials for profile avatar
  const getInitials = (name?: string | null) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <header style={{
      height: '70px',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--sidebar-border)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      marginLeft: '260px',
      width: 'calc(100% - 260px)'
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search 
          size={18} 
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} 
        />
        <input 
          type="text" 
          placeholder="Search for patient, doctor, or report..." 
          style={{
            width: '100%',
            padding: '0.6rem 1rem 0.6rem 2.8rem',
            borderRadius: '0.8rem',
            border: '1px solid var(--sidebar-border)',
            background: 'var(--background)',
            color: 'inherit',
            fontSize: '0.9rem',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--foreground)',
            opacity: 0.7
          }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        <div style={{ position: 'relative' }}>
          <Bell size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '10px',
            height: '10px',
            background: 'var(--danger)',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        </div>

        <div 
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '1rem',
            background: 'var(--sidebar-border)',
            cursor: 'pointer',
            border: '1px solid var(--sidebar-border)',
            transition: 'all 0.2s ease'
          }}
          className="header-profile"
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.8rem'
          }}>
            {getInitials(session?.user?.name)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{session?.user?.name || 'Guest Staff'}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{(session?.user as any)?.role || 'Click to Logout'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
