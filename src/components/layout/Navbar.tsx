'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { 
  Bell, 
  Search, 
  User, 
  Moon, 
  Sun, 
  Menu, 
  LogOut, 
  Clock, 
  Activity, 
  Stethoscope, 
  TrendingUp,
  CircleCheck,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [stats, setStats] = React.useState({
    waiting: 0,
    inProgress: 0,
    availableDoctors: 0,
    avgWaitTime: 15
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && systemTheme);
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data && !data.error) setStats(data);
      } catch (err) {
        console.error('Navbar Stats Error:', err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const isPatientLayout = pathname?.startsWith('/patient');
  const isMinimal = pathname === '/' || pathname === '/slides' || pathname === '/login';

  if (!mounted || isMinimal) return null;

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      background: 'rgba(var(--background-rgb, 255, 255, 255), 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--sidebar-border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between',
      margin: !isPatientLayout ? '0 0 0 var(--sidebar-width, 260px)' : '0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: !isPatientLayout ? 'calc(100% - var(--sidebar-width, 260px))' : '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <motion.div 
          className="mobile-only" 
          whileTap={{ scale: 0.9 }}
          style={{ marginRight: '0.5rem' }}
        >
           <Menu 
             size={22} 
             onClick={() => document.querySelector('.sidebar')?.classList.toggle('mobile-open')} 
             style={{ cursor: 'pointer', color: 'var(--primary)' }}
           />
        </motion.div>

        {isPatientLayout ? (
           <Link href="/" style={{ textDecoration: 'none' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Stethoscope size={18} />
                </div>
                <span style={{ fontWeight: 900, color: 'var(--foreground)', fontSize: '1rem', letterSpacing: '-0.5px' }}>CareQueue</span>
             </div>
           </Link>
        ) : (
           <div className="search-wrapper" style={{ position: 'relative', width: 'clamp(200px, 30vw, 320px)' }}>
              <Search 
                size={16} 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} 
              />
              <input 
                type="text" 
                placeholder="Search..." 
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  borderRadius: '2rem',
                  border: '1px solid var(--sidebar-border)',
                  background: 'rgba(var(--background-rgb, 255, 255, 255), 0.5)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
           </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Real-time Stats */}
        <div className="mobile-hide" style={{ display: 'flex', gap: '1rem', background: 'rgba(var(--primary-rgb, 37, 99, 235), 0.05)', padding: '0.35rem 0.75rem', borderRadius: '2rem', border: '1px solid rgba(var(--primary-rgb, 37, 99, 235), 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
             <Activity size={12} color="var(--primary)" />
             <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Waiting: <span style={{ color: 'var(--primary)' }}>{stats.waiting}</span></span>
          </div>
          <div style={{ width: '1px', background: 'rgba(var(--primary-rgb, 37, 99, 235), 0.1)', height: '12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
             <Clock size={12} color="var(--warning)" />
             <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Avg: <span style={{ color: 'var(--warning)' }}>{stats.avgWaitTime}m</span></span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
           <motion.button
             whileHover={{ scale: 1.1, background: 'rgba(var(--primary-rgb, 37, 99, 235), 0.05)' }}
             whileTap={{ scale: 0.9 }}
             onClick={toggleTheme}
             style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', color: 'var(--foreground)', opacity: 0.6 }}
           >
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
           </motion.button>

           <div style={{ position: 'relative', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
             <Bell size={18} style={{ opacity: 0.6 }} />
             <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }} />
           </div>

           <div className="v-divider" style={{ width: '1px', height: '20px', background: 'var(--sidebar-border)', margin: '0 0.25rem' }} />

           <div 
             className="nav-profile-trigger" 
             onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
             style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '2rem', border: '1px solid transparent', transition: 'all 0.2s', position: 'relative' }}
           >
              <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.7rem' }}>
                {getInitials(session?.user?.name)}
              </div>
              <div className="mobile-hide" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.1 }}>{session?.user?.name || 'Staff Member'}</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>{(session?.user as any)?.role || 'Physician'}</div>
              </div>
              <ChevronDown size={12} style={{ opacity: 0.4, transform: isUserMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{ 
                      position: 'absolute', 
                      top: '130%', 
                      right: 0, 
                      width: '180px', 
                      background: 'var(--sidebar-bg)', 
                      borderRadius: '1rem', 
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)', 
                      border: '1px solid var(--sidebar-border)',
                      padding: '0.4rem',
                      zIndex: 1200
                    }}
                  >
                    <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: '0.75rem', textDecoration: 'none', color: 'inherit', fontSize: '0.8rem', fontWeight: 600 }}>
                      <User size={14} />
                      <span>Account</span>
                    </Link>
                    <div style={{ height: '1px', background: 'var(--sidebar-border)', margin: '0.4rem' }} />
                    <button 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </nav>
  );

}
