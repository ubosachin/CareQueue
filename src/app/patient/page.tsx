'use client';

import React from 'react';
import { 
  Clock, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Calendar, 
  UserPlus,
  ArrowRight,
  Stethoscope,
  TrendingDown,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEPARTMENTS = ['Cardiology', 'Emergency', 'Pediatrics', 'General Medicine', 'Orthopedics'];

export default function PatientPortal() {
  const [patients, setPatients] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    department: 'General Medicine',
    priority: 'Medium'
  });
  const [showStatus, setShowStatus] = React.useState(false);
  const [registeredToken, setRegisteredToken] = React.useState('');

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/patients');
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Live updates
    return () => clearInterval(interval);
  }, []);

  const handleJoinQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.token) {
        setRegisteredToken(data.token);
        setShowStatus(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="patient-portal" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
      padding: 'clamp(1rem, 4vw, 3rem) 2rem'
    }}>


      <main className="content-split" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '0.75rem' }}>
              Your Care, <span style={{ color: 'var(--primary)' }}>Optimized</span>.
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.6, maxWidth: '450px', lineHeight: 1.5 }}>
              Join the medical queue from your device. Real-time AI prediction for wait times and physician availability.
            </p>
          </section>

          <div className="stats-grid">
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <Clock size={32} color="var(--primary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>LIVE STATS</span>
              </div>
              <p style={{ opacity: 0.5, fontSize: '0.8rem', fontWeight: 600 }}>Avg. Wait Time</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>14 <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>min</span></h3>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <UserPlus size={32} color="var(--secondary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>DYNAMIC</span>
              </div>
              <p style={{ opacity: 0.5, fontSize: '0.8rem', fontWeight: 600 }}>Patients in Queue</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{patients.length || '--'}</h3>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck color="var(--secondary)" />
              Recent Status Board
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {patients.slice(0, 3).map((p, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(0,0,0,0.02)',
                  borderRadius: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>{p.token}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>{p.department}</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.4 }}>{p.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>

          <AnimatePresence mode="wait">
            {!showStatus ? (
              <motion.div 
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card" 
                style={{ padding: '2.5rem', background: 'white', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Join the Queue</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Register yourself to get an instant medical token.</p>
                </div>

                <form onSubmit={handleJoinQueue} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>Full name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.6 }}>Age</label>
                      <input 
                        type="number" 
                        placeholder="25"
                        required
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: e.target.value})}
                        style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                      />
                    </div>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.6 }}>Department</label>
                      <select 
                        value={formData.department}
                        onChange={e => setFormData({...formData, department: e.target.value})}
                        style={{ padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', background: 'white' }}
                      >
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ padding: '0.8rem', borderRadius: '0.75rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Get Token Now <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card" 
                style={{ padding: '3rem', textAlign: 'center', background: 'var(--primary)', color: 'white' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 2rem' }}>
                  <ShieldCheck size={48} />
                </div>
                <h3 style={{ fontSize: '1rem', opacity: 0.8, fontWeight: 600 }}>Your Medical Token</h3>
                <h2 style={{ fontSize: 'clamp(2rem, 15vw, 3rem)', fontWeight: 900, margin: '1rem 0' }}>{registeredToken}</h2>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '2rem' }}>Estimated wait: 14 mins</p>
                <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6 }}>Instruction</p>
                  <p style={{ fontWeight: 600 }}>Please wait in the common lobby. You will be notified when Dr. Sarah is ready.</p>
                </div>
                <button 
                  onClick={() => setShowStatus(false)}
                  style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '1rem 2rem', borderRadius: '2rem', marginTop: '2rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Book New Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      <footer style={{ maxWidth: '1200px', margin: '5rem auto 0', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>© 2026 CareQueue AI. Healthcare Optimization Platform.</p>
      </footer>
    </div>
  );
}
