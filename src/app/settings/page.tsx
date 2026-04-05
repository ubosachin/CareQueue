'use client';

import React from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Heart, 
  LogOut,
  ChevronRight,
  Stethoscope,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="flex-col-responsive" style={{ gap: '2rem', maxWidth: '1200px' }}>
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '0.2rem', letterSpacing: '-0.02em' }}>Settings & Configuration</h1>
        <p style={{ opacity: 0.6, fontSize: '0.95rem', fontWeight: 500 }}>System preferences and administrative security controls.</p>
      </div>

      <div className="content-split" style={{ gap: '2rem' }}>
         <aside className="mobile-hide" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {[
             { label: 'Profile Settings', icon: <User size={18} />, active: true },
             { label: 'Security & Auth', icon: <Shield size={18} /> },
             { label: 'Notifications', icon: <Bell size={18} /> },
             { label: 'Integrations', icon: <Globe size={18} /> },
             { label: 'Data Management', icon: <Database size={18} /> },
             { label: 'Hospital Info', icon: <Heart size={18} /> }
           ].map((item, i) => (
             <motion.div 
               key={i} 
               whileHover={{ x: 5 }}
               style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem 1rem', 
                borderRadius: '0.75rem',
                background: item.active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                color: item.active ? 'var(--primary)' : 'inherit',
                fontWeight: item.active ? 700 : 500,
                fontSize: '0.9rem',
                opacity: item.active ? 1 : 0.6,
                cursor: 'pointer'
              }}>
                 {item.icon}
                 {item.label}
              </motion.div>
           ))}
        </aside>

        <main className="flex-col-responsive" style={{ gap: '1.5rem', display: 'flex' }}>
           <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--primary)" />
                Active Staff Profile
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '1.5rem', marginBottom: '2rem' }}>
                 <div style={{ 
                   width: '80px', 
                   height: '80px', 
                   borderRadius: '50%', 
                   background: 'var(--primary)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: '2rem',
                   fontWeight: 800,
                   color: 'white'
                 }}>
                   {session?.user?.name?.[0] || 'A'}
                 </div>
                 <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{session?.user?.name}</h4>
                    <p style={{ opacity: 0.5, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{session?.user?.email}</p>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '0.3rem 0.75rem', 
                      background: 'var(--success-bg)', 
                      color: 'var(--success)', 
                      borderRadius: '2rem' 
                    }}>
                      VERIFIED {(session?.user as any)?.role || 'STAFF'}
                    </span>
                 </div>
                 <button className="glass-panel" style={{ padding: '0.6rem 1rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 600 }}>Change Avatar</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="grid-responsive" style={{ gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>Staff Name</label>
                       <input 
                         type="text" 
                         defaultValue={session?.user?.name || ''} 
                         style={{ padding: '0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '0.9rem', width: '100%' }} 
                       />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                       <label style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>Official Email</label>
                       <input 
                         type="email" 
                         defaultValue={session?.user?.email || ''} 
                         style={{ padding: '0.85rem', borderRadius: '0.6rem', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '0.9rem', width: '100%' }} 
                       />
                    </div>
                  </div>
                 <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                    <Save size={18} /> Update Profile
                 </button>
              </div>
           </div>

           <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '2rem' }}>Interface & Display</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                       <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>Clinical Dark Mode</h4>
                       <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Reduces eye strain during night shifts in low-light environments.</p>
                    </div>
                    <div style={{ background: 'var(--sidebar-border)', padding: '0.25rem', borderRadius: '2rem', display: 'flex', gap: '0.2rem' }}>
                       <button style={{ padding: '0.4rem 1rem', background: 'white', borderRadius: '2rem', border: 'none', display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                          <Sun size={14} /> Light
                       </button>
                       <button style={{ padding: '0.4rem 1rem', background: 'transparent', borderRadius: '2rem', border: 'none', display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.8rem', opacity: 0.5 }}>
                          <Moon size={14} /> Dark
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => signOut({ callbackUrl: '/login' })}
             className="glass-panel" 
             style={{ padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(239, 64, 68, 0.1)', color: 'var(--danger)', fontWeight: 800, display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
           >
              <LogOut size={20} /> Terminate Authorized Session
           </button>
        </main>
      </div>
    </div>
  );
}
