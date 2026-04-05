'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show navigation on specific marketing/auth pages
  const isMarketing = pathname === '/' || pathname === '/slides' || pathname === '/login';
  const isPatientHub = pathname.startsWith('/patient');

  if (isMarketing) {
    return <main className="minimal-layout">{children}</main>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      {!isPatientHub && <Sidebar />}
      
      <div 
        className="mobile-backdrop mobile-only" 
        onClick={() => document.querySelector('.sidebar')?.classList.remove('mobile-open')}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1150,
          display: 'none'
        }} 
      />

      <div className="main-content" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: !isPatientHub ? 'var(--sidebar-width, 260px)' : '0', 
        width: !isPatientHub ? 'calc(100% - var(--sidebar-width, 260px))' : '100%',
        transition: 'margin-left 0.3s ease'
      }}>
        <Navbar />
        
        <main style={{ 
          padding: isPatientHub ? '0' : '2rem', 
          minHeight: 'calc(100vh - 70px)',
          backgroundColor: 'var(--background)'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
