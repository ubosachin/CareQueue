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
  const [isDark, setIsDark] = React.useState(false);
  const [stats, setStats] = React.useState({
    waiting: 0,
    inProgress: 0,
    availableDoctors: 0,
    avgWaitTime: 15
  });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  // Poll for stats every 30 seconds
  React.useEffect(() => {
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

  const isPatientLayout = pathname.startsWith('/patient');
  const isMinimal = pathname === '/' || pathname === '/slides' || pathname === '/login';

  if (isMinimal) return null;

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      background: 'rgba(var(--card-bg-rgb), 0.7)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--sidebar-border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between',
      margin: !isPatientLayout ? '0 0 0 calc(var(--sidebar-width, 260px))' : '0',
      transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: !isPatientLayout ? 'calc(100% - var(--sidebar-width, 260px))' : '100%'
    }}>
      {/* Search / Status Area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div className="mobile-only" style={{ marginRight: '1rem' }}>
           <Menu 
             size={24} 
             onClick={() => document.querySelector('.sidebar')?.classList.toggle('mobile-open')} 
             style={{ cursor: 'pointer' }}
           />
        </div>

        {isPatientLayout ? (
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '35px', height: '35px', background: 'var(--primary)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Stethoscope size={20} />
                  </div>
                  <span style={{ fontWeight: 900, color: 'var(--foreground)', fontSize: '1rem', letterSpacing: '-0.5px' }}>CareQueue</span>
              </Link>
           </div>
        ) : (
           <div className="search-wrapper" style={{ position: 'relative', width: '320px' }}>
              <Search 
                size={18} 
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} 
              />
              <input 
                type="text" 
                placeholder="Search resources, patients..." 
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.8rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--sidebar-border)',
                  background: 'rgba(var(--card-bg-rgb), 0.5)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
           </div>
        )}
      </div>

      {/* Real-time Indicators & User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Status Pill (Responsive) */}
        {!isMinimal && (
          <div className="stats-ticker mobile-hide" style={{ display: 'flex', gap: '1.25rem', background: 'rgba(0,0,0,0.03)', padding: '0.4rem 0.85rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <Activity size={14} color="var(--primary)" />
               <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Waiting: <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{stats.waiting}</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <Clock size={14} color="var(--warning)" />
               <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Avg: <span style={{ color: 'var(--warning)', fontWeight: 800 }}>{stats.avgWaitTime}m</span></span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <motion.button
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={toggleTheme}
             style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', color: 'var(--foreground)', opacity: 0.6 }}
           >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
           </motion.button>

           <div style={{ position: 'relative' }}>
             <Bell size={20} style={{ opacity: 0.6, cursor: 'pointer' }} />
             <span style={{ position: 'absolute', top: -1, right: -1, width: '9px', height: '9px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }} />
           </div>

           <div className="v-divider" style={{ width: '1px', height: '24px', background: 'var(--sidebar-border)' }} />

           <div 
             className="nav-profile-trigger" 
             onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
             style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.35rem 0.65rem', borderRadius: '1rem', border: '1px solid transparent', transition: 'all 0.2s' }}
           >
              <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.75rem', boxShadow: '0 4px 10px rgba(37,99,235,0.2)' }}>
                {getInitials(session?.user?.name)}
              </div>
              <div className="mobile-hide" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.1 }}>{session?.user?.name || 'Staff Guest'}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5 }}>{(session?.user as any)?.role || 'Observer'}</div>
              </div>
              <ChevronDown size={14} style={{ opacity: 0.4, transform: isUserMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    style={{ 
                      position: 'absolute', 
                      top: '120%', 
                      right: 0, 
                      width: '200px', 
                      background: 'white', 
                      borderRadius: '1rem', 
                      boxShadow: '0 20px 50px rgba(0,0,0,0.1)', 
                      border: '1px solid var(--sidebar-border)',
                      padding: '0.5rem',
                      zIndex: 1200
                    }}
                  >
                    <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s' }}>
                      <User size={16} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Account Profile</span>
                    </Link>
                    <div style={{ height: '1px', background: 'var(--sidebar-border)', margin: '0.5rem' }} />
                    <button 
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', transition: 'background 0.2s' }}
                    >
                      <LogOut size={16} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Log Out</span>
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
