'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Stethoscope, Lock, Mail, ChevronRight, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = React.useState('admin@carequeue.ai');
  const [password, setPassword] = React.useState('admin123');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid medical credentials. Access denied.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            background: 'var(--primary)', 
            width: '60px', 
            height: '60px', 
            borderRadius: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
          }}>
            <Stethoscope size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Medical Access</h1>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '0.5rem' }}>Authorized CareQueue Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.7 }}>Hospital Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem 1rem 0.8rem 2.8rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid var(--sidebar-border)',
                  background: 'var(--background)',
                  color: 'inherit',
                  outline: 'none'
                }} 
                placeholder="doctor@hospital.com"
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.7 }}>Secure Key</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem 1rem 0.8rem 2.8rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid var(--sidebar-border)',
                  background: 'var(--background)',
                  color: 'inherit',
                  outline: 'none'
                }} 
                placeholder="********"
                required
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ 
              padding: '1rem', 
              fontSize: '1rem', 
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Verifying...' : (
              <>
                Unlock Dashboard <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.75rem', 
            fontWeight: 800,
            padding: '0.4rem 1rem',
            borderRadius: '2rem',
            background: 'rgba(37, 99, 235, 0.05)',
            color: 'var(--primary)'
          }}>
            <Zap size={14} fill="var(--primary)" />
            AI-POWERED SECURITY 2.0
          </div>
        </div>
      </motion.div>
    </div>
  );
}
