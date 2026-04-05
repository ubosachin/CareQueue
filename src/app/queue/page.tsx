'use client';

import React from 'react';
import { 
  Users, 
  Search, 
  ShieldAlert, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  MoreVertical,
  Activity,
  AlertCircle,
  Sparkles,
  Filter, 
  ChevronRight,
  TrendingDown,
  Trash2,
  Edit2,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRIORITY_STYLES = {
  'Emergency': { bg: 'rgba(239, 64, 68, 0.1)', color: '#ef4444', border: '#ef4444' },
  'High': { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', border: '#f97316' },
  'Medium': { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: '#2563eb' },
  'Low': { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '#22c55e' }
};

export default function QueueManagement() {
  const [patients, setPatients] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/patients');
        const data = await res.json();
        setPatients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatArrival = (dateString: string) => {
    if (!dateString) return '--:--';
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="content-split" style={{ alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Queue Management</h1>
          <p style={{ opacity: 0.6, fontWeight: 500 }}>Live view of all patients currently in the hospital system.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--sidebar-border)'
          }}>
            <Search size={18} style={{ opacity: 0.5 }} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', color: 'inherit' }}
            />
          </div>
          <button 
            className="btn-primary" 
            onClick={async () => {
              const res = await fetch('/api/optimize', { method: 'POST' });
              if (res.ok) window.location.reload();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--secondary)' }}
          >
            <Sparkles size={18} />
            <span>Smart AI Optimization</span>
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} />
            <span>Emergency Priority</span>
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container">
          <table style={{ minWidth: '1000px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--sidebar-border)', background: 'rgba(0,0,0,0.02)' }}>
              {['Token / Patient', 'Priority', 'Department', 'Assignee / Arrival', 'Wait Time', 'Status', 'Actions'].map((head) => (
                <th key={head} style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)', opacity: 0.5, textTransform: 'uppercase' }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                    Loading patient data...
                  </td>
                </tr>
              ) : filteredPatients.map((patient, index) => {
                const styles = (PRIORITY_STYLES as any)[patient.priority] || PRIORITY_STYLES['Medium'];
                return (
                  <motion.tr 
                    key={patient._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ 
                      borderBottom: '1px solid var(--sidebar-border)',
                      cursor: 'pointer'
                    }}
                    whileHover={{ background: 'rgba(37, 99, 235, 0.03)' }}
                  >
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '0.75rem', 
                          background: 'var(--sidebar-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)',
                          fontWeight: 700
                        }}>
                          {patient.token.split('-')[1]}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700 }}>{patient.name}</span>
                          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{patient.token} • {patient.age}yrs</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: styles.bg,
                        color: styles.color,
                      }}>
                        <div style={{ 
                          width: '6px', 
                          height: '6px', 
                          borderRadius: '50%', 
                          background: styles.color,
                          boxShadow: `0 0 8px ${styles.color}`
                        }} />
                        {patient.priority}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{patient.department}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{patient.assignedDoctor?.name || 'Unassigned'}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Arr: {formatArrival(patient.arrivalTime)}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: patient.estimatedWaitTime < 10 ? 'var(--secondary)' : 'inherit' }}>
                        <Clock size={16} style={{ opacity: 0.5 }} />
                        <span>{patient.estimatedWaitTime || 0} min</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div className="animate-pulse-subtle" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{patient.status}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ border: 'none', background: 'var(--sidebar-border)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--primary)' }}>
                          <Edit2 size={16} />
                        </button>
                        <button style={{ border: 'none', background: 'var(--sidebar-border)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: 'var(--danger)' }}>
                          <Trash2 size={16} />
                        </button>
                        <button style={{ border: 'none', background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
          </table>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '1rem', color: 'var(--secondary)' }}>
            <TrendingDown size={32} />
          </div>
          <div>
            <h3 style={{ fontWeight: 800 }}>Queue Optimization</h3>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>AI has reduced wait times by 24% for cases today.</p>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
            <Users size={32} />
          </div>
          <div>
            <h3 style={{ fontWeight: 800 }}>Current Load</h3>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{patients.length} active patients. All systems optimal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
