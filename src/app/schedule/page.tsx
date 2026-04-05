'use client';

import React from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User, 
  MoreVertical,
  Filter,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const APPOINTMENTS = [
  { id: 1, name: 'Cardiac Assessment', time: '09:00', doctor: 'Dr. Sarah Johnson', type: 'Clinical' },
  { id: 2, name: 'Pediatric Checkup', time: '11:00', doctor: 'Dr. Emily Williams', type: 'Routine' },
  { id: 3, name: 'Emergency Surgery', time: '13:00', doctor: 'Dr. Michael Chen', type: 'Urgent' },
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <div className="flex-col-responsive" style={{ gap: '2rem' }}>
      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>Smart Schedule</h1>
          <p style={{ opacity: 0.6, fontWeight: 500, fontSize: '1rem' }}>Live physician shifts and upcoming patient appointments.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', width: 'auto', flexWrap: 'wrap' }}>
          <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, border: '1px solid var(--sidebar-border)' }}>
            <Filter size={18} /> Filters
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> New Event
          </button>
        </div>
      </div>

      <div className="content-split" style={{ gap: '2rem' }}>
        <aside className="mobile-hide" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                 <h3 style={{ fontWeight: 800 }}>Mini Calendar</h3>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <ChevronLeft size={16} style={{ cursor: 'pointer', opacity: 0.5 }} />
                    <ChevronRight size={16} style={{ cursor: 'pointer', opacity: 0.5 }} />
                 </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                  {DAYS.map(d => <span key={d} style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.4 }}>{d}</span>)}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 600, 
                      padding: '0.4rem', 
                      borderRadius: '0.4rem',
                      background: i === 14 ? 'var(--primary)' : 'transparent',
                      color: i === 14 ? 'white' : 'inherit',
                      opacity: i > 25 ? 0.3 : 1,
                      cursor: 'pointer'
                    }}>
                      {i + 1}
                    </div>
                  ))}
              </div>
           </div>

           <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Shift Load</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {[
                   { name: 'Shift A', val: 90, color: 'var(--primary)' },
                   { name: 'Shift B', val: 40, color: 'var(--secondary)' },
                   { name: 'Shift C', val: 65, color: 'var(--success)' }
                 ].map((s, i) => (
                   <div key={i}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                       <span>{s.name}</span>
                       <span>{s.val}% Full</span>
                     </div>
                     <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px' }}>
                        <div style={{ width: `${s.val}%`, height: '100%', background: s.color, borderRadius: '3px' }} />
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </aside>

        <main className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
           <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--sidebar-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.01)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Schedule: Tuesday, April 15th</h2>
              <div style={{ display: 'flex', borderRadius: '0.75rem', background: 'var(--sidebar-border)', padding: '0.2rem' }}>
                 {['Day', 'Week', 'Month'].map(v => (
                   <button key={v} style={{ 
                     border: 'none', 
                     padding: '0.5rem 1rem', 
                     borderRadius: '0.6rem', 
                     fontWeight: 700, 
                     fontSize: '0.85rem',
                     background: v === 'Week' ? 'white' : 'transparent',
                     boxShadow: v === 'Week' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                     cursor: 'pointer'
                   }}>
                     {v}
                   </button>
                 ))}
              </div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column' }}>
             {HOURS.map((hour, idx) => {
               const apt = APPOINTMENTS.find(a => a.time === hour);
               return (
                 <div key={hour} style={{ 
                   display: 'grid', 
                   gridTemplateColumns: '80px 1fr', 
                   borderBottom: '1px solid var(--sidebar-border)',
                   minHeight: '80px'
                 }}>
                   <div style={{ 
                     padding: '1.5rem', 
                     fontSize: '0.8rem', 
                     fontWeight: 700, 
                     opacity: 0.4, 
                     textAlign: 'right',
                     borderRight: '1px dotted var(--sidebar-border)'
                   }}>
                     {hour}
                   </div>
                   <div style={{ padding: '0.75rem 1.5rem', position: 'relative' }}>
                     {apt && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         whileHover={{ scale: 1.01 }}
                         style={{ 
                           background: apt.type === 'Urgent' ? 'rgba(239, 64, 68, 0.08)' : 'rgba(37, 99, 235, 0.08)', 
                           padding: '1rem', 
                           borderRadius: '1rem', 
                           border: `1px solid ${apt.type === 'Urgent' ? 'rgba(239, 64, 68, 0.15)' : 'rgba(37, 99, 235, 0.15)' }`,
                           height: '100%',
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           cursor: 'pointer'
                         }}
                       >
                         <div>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: apt.type === 'Urgent' ? 'var(--danger)' : 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{apt.type}</p>
                            <h4 style={{ fontWeight: 800, fontSize: '1rem', margin: '0.25rem 0' }}>{apt.name}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.6 }}>
                               <User size={14} /> <span>{apt.doctor}</span>
                            </div>
                         </div>
                         <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.03)' }}>
                            <MoreVertical size={16} style={{ opacity: 0.4 }} />
                         </div>
                       </motion.div>
                     )}
                   </div>
                 </div>
               );
             })}
           </div>
        </main>
      </div>
    </div>
  );
}
