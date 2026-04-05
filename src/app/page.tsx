'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from '@/components/layout/LandingNavbar';
import { 
  BrainCircuit, 
  Clock, 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Zap,
  LayoutDashboard,
  Stethoscope
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', overflowX: 'hidden' }}>
      <LandingNavbar />

      {/* Hero Section */}
      <section style={{ 
        paddingTop: 'clamp(100px, 15vh, 160px)', 
        paddingBottom: 'clamp(60px, 10vh, 100px)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        paddingLeft: '5%',
        paddingRight: '5%'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: 'rgba(37, 99, 235, 0.1)', 
            padding: '0.5rem 1.5rem', 
            borderRadius: '2rem', 
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Zap size={14} fill="var(--primary)" />
          AI-POWERED QUEUE ORCHESTRATION 2.0
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, maxWidth: '850px', letterSpacing: '-1.2px' }}
        >
          Reduce Patient Wait <br/> Times by <span className="gradient-text">Up to 50%.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1rem', opacity: 0.6, maxWidth: '650px', margin: '1.25rem 0 2rem', lineHeight: 1.5 }}
        >
          Experience the world's most intelligent hospital queue optimization platform. 
          Powered by real-time predictive analytics and dynamic doctor allocation.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hero-buttons"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link href="/dashboard">
            <button className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <LayoutDashboard size={18} />
              <span>Medical Staff Login</span>
            </button>
          </Link>
          <Link href="/patient">
            <button className="glass-panel" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', borderRadius: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', border: '2px solid var(--secondary)' }}>
              <Users size={18} color="var(--secondary)" />
              <span>Patient Portal</span>
            </button>
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          id="solutions"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', damping: 20 }}
          className="content-split"
          style={{ 
            marginTop: '5rem', 
            width: '100%', 
            maxWidth: '1100px', 
            borderRadius: '2rem', 
            overflow: 'hidden',
            boxShadow: '0 50px 100px -20px rgba(15, 23, 42, 0.2)',
            border: '8px solid rgba(255, 255, 255, 0.4)',
            background: 'var(--background)'
          }}
        >
          <div style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
             <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.22rem)', fontWeight: 900, letterSpacing: '-1.1px' }}>Engineered for <span style={{ color: 'var(--primary)' }}>Speed</span></h3>
             <p style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.5 }}>Our clinician dashboard provides real-time oversight of hospital throughput, triage stability, and AI-optimized doctor assignments.</p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { l: 'Token Serialization', d: '99.9% fault tolerance' },
                  { l: 'AI Triage', d: 'Prioritization in <150ms' },
                  { l: 'Auto-Scaling', d: 'Dynamic resource allocation' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--primary)' }}><ShieldCheck size={20} /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, textAlign: 'left' }}>{item.l}: <span style={{ opacity: 0.5 }}>{item.d}</span></div>
                  </div>
                ))}
             </div>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
             <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2664" alt="Hospital Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
             <div style={{ 
               position: 'absolute', 
               inset: 0, 
               background: 'linear-gradient(to top, var(--background), transparent)',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'flex-end',
               padding: '2rem',
               textAlign: 'left'
             }}>
                <div className="glass-card" style={{ padding: '1.5rem', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    <BrainCircuit size={24} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Predictive AI Running</h3>
                  </div>
                  <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>Wait time analysis synchronized. 4 optimizations pending.</p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="impact" style={{ padding: '5rem 5%', background: 'rgba(37, 99, 235, 0.02)' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { label: 'Wait Reduction', val: '40%', icon: <Clock /> },
            { label: 'Patient Inflow', val: '12k+', icon: <Users /> },
            { label: 'Efficiency Gain', val: '24%', icon: <Activity /> },
            { label: 'ROI Potential', val: '180%', icon: <TrendingUp /> }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.25rem' }}>{stat.val}</div>
              <p style={{ opacity: 0.5, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem' }}>Smarter Hospital Operations</h2>
          <p style={{ opacity: 0.6, fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>Designed for complex medical environments that demand absolute precision.</p>
        </div>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Emergency Triage', desc: 'AI automatically flags and prioritizes critical patients through token bypass.', icon: <ShieldCheck size={32} /> },
            { title: 'Dynamic Scheduling', desc: 'Doctor allocation adjusts in real-time based on current patient complexity.', icon: <LayoutDashboard size={32} /> },
            { title: 'Flow Insights', desc: 'Deep dive into bottleneck analysis with our comprehensive data visualization suite.', icon: <TrendingUp size={32} /> },
            { title: 'Mobile Companion', desc: 'Patient notifications and live wait-time updates on any mobile device.', icon: <Activity size={32} /> },
            { title: 'Smart Analytics', desc: 'Historical data modeling to predict future staffing requirements weekly.', icon: <TrendingUp size={32} /> },
            { title: 'Cloud Native', desc: 'Highly secure, HIPAA-compliant architecture designed for 99.99% uptime.', icon: <BrainCircuit size={32} /> }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card"
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '1.25rem', 
                background: 'rgba(37, 99, 235, 0.05)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{feature.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.5 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '5rem 5%', background: 'var(--sidebar-bg)', textAlign: 'center', borderTop: '1px solid var(--sidebar-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '0.5rem' }}>
            <Stethoscope size={24} color="white" />
          </div>
          <span className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 900 }}>CareQueue AI</span>
        </div>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>© 2026 CareQueue Hospital Systems INC. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
