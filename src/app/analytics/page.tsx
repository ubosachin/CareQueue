'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Activity, 
  Download, 
  Filter, 
  Calendar,
  ArrowUpRight,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';

const WAIT_TREND_DATA = [
  { time: '08:00', wait: 12, patients: 5 },
  { time: '10:00', wait: 18, patients: 12 },
  { time: '12:00', wait: 25, patients: 22 },
  { time: '14:00', wait: 20, patients: 15 },
  { time: '16:00', wait: 15, patients: 10 },
  { time: '18:00', wait: 10, patients: 4 }
];

const DEP_DATA = [
  { name: 'Emergency', value: 400, color: '#ef4444' },
  { name: 'Cardiology', value: 300, color: '#3b82f6' },
  { name: 'Pediatrics', value: 300, color: '#10b981' },
  { name: 'Orthopedics', value: 200, color: '#f59e0b' }
];

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="content-split" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800 }}>Clinical Analytics</h1>
            <p style={{ opacity: 0.6, fontWeight: 500 }}>Global performance metrics and patient flow trends.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-start' }}>
            <button className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', fontWeight: 600 }}>
              <Download size={18} /> Export
            </button>
            <button className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} /> Last 7 Days
            </button>
          </div>
        </div>

        <div className="stats-grid">
        {[
          { label: 'Patient Volume', val: '1,284', trend: '+14%', icon: <Users /> },
          { label: 'Avg Wait Reduction', val: '22min', trend: '-8min', icon: <TrendingUp /> },
          { label: 'Staff Utilization', val: '88%', trend: '+2%', icon: <Activity /> },
          { label: 'Patient Satisfaction', val: '4.8/5', trend: '+0.2', icon: <Stethoscope /> }
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card" 
            style={{ padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>{kpi.icon}</div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>{kpi.trend}</span>
            </div>
            <p style={{ opacity: 0.5, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{kpi.label}</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>{kpi.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="content-split">
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: 800 }}>Patient Activity & Wait Trends</h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} /> Volume
              </span>
              <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--secondary)' }} /> Wait Time
              </span>
            </div>
          </div>
          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WAIT_TREND_DATA}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} style={{ fontSize: '0.8rem', opacity: 0.5 }} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: '0.8rem', opacity: 0.5 }} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--sidebar-border)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="patients" stroke="var(--primary)" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                <Area type="monotone" dataKey="wait" stroke="var(--secondary)" fill="transparent" strokeWidth={3} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '2rem' }}>Volume by Department</h3>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEP_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEP_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {DEP_DATA.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
                   <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                   {item.name}
                </div>
                <span style={{ fontWeight: 700 }}>{Math.round((item.value / 1200) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: 800 }}>Hourly Doctor Utilization</h3>
          </div>
          <div style={{ height: '300px' }}>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WAIT_TREND_DATA}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                   <XAxis dataKey="time" axisLine={false} tickLine={false} style={{ fontSize: '0.8rem', opacity: 0.5 }} />
                   <YAxis axisLine={false} tickLine={false} style={{ fontSize: '0.8rem', opacity: 0.5 }} />
                   <Tooltip />
                   <Bar dataKey="patients" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
             </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
}
