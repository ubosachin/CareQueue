'use client';

import React from 'react';
import StatCard from '@/components/ui/StatCard';
import { 
  Users, 
  Clock, 
  Stethoscope, 
  AlertCircle, 
  Activity, 
  ArrowRight,
  BrainCircuit,
  Zap,
  TrendingUp,
  LayoutGrid,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

const DATA = [
  { time: '08:00', patients: 12, wait: 5 },
  { time: '09:00', patients: 25, wait: 12 },
  { time: '10:00', patients: 48, wait: 28 },
  { time: '11:00', patients: 35, wait: 22 },
  { time: '12:00', patients: 22, wait: 15 },
  { time: '13:00', patients: 18, wait: 10 },
  { time: '14:00', patients: 30, wait: 18 },
  { time: '15:00', patients: 40, wait: 25 },
];

export default function Dashboard() {
  const { data: session } = useSession();
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [patientName, setPatientName] = React.useState('');
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [patients, setPatients] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, patsRes] = await Promise.all([
          fetch('/api/doctors'),
          fetch('/api/patients')
        ]);
        const [docs, pats] = await Promise.all([docsRes.json(), patsRes.json()]);
        setDoctors(docs);
        setPatients(pats);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const doctorLoad = doctors.map(d => ({
    name: d.name.split(' ')[1],
    patients: d.patientsInQueue,
    status: d.status
  }));
  
  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const res = await fetch('/api/optimize', { method: 'POST' });
      const result = await res.json();
      
      if (result.success) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        // Refresh local view of live data
        const [docsRes, patsRes] = await Promise.all([
          fetch('/api/doctors'),
          fetch('/api/patients')
        ]);
        setDoctors(await docsRes.json());
        setPatients(await patsRes.json());
      }
    } catch (err) {
      console.error('Optimization failed:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;
    
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: patientName, department: 'General', priority: 'Normal' })
      });
      const newPatient = await res.json();
      alert(`Success! Token ${newPatient.token} generated for ${patientName}.`);
      setPatients([...patients, newPatient]);
      setPatientName('');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex-col-responsive" style={{ gap: '2rem' }}>
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'var(--secondary)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 600
            }}
          >
            <Zap size={20} fill="white" />
            AI Optimization Completed Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.2rem' }}>
            {session?.user?.name ? `Welcome, ${session.user.name}` : 'Hospital Command Center'}
          </h1>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', fontWeight: 500 }}>
            {(session?.user as any)?.role === 'ADMIN' ? 'Full administrative control active.' : 'Live hospital monitoring in progress.'}
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isOptimizing ? 0.7 : 1 }}
        >
          {isOptimizing ? (
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
             >
               <Zap size={18} fill="white" />
             </motion.div>
          ) : (
            <Zap size={18} fill="white" />
          )}
          <span>{isOptimizing ? 'Optimizing...' : 'Optimize Queue'}</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          label="Total Patients Today" 
          value="184" 
          icon={<Users size={20} />} 
          trend="+12% from yesterday" 
          trendType="positive" 
          color="--primary"
        />
        <StatCard 
          label="Avg. Wait Time" 
          value="12.4m" 
          icon={<Clock size={20} />} 
          trend="-3.2m with AI" 
          trendType="positive" 
          color="--secondary"
        />
        <StatCard 
          label="Doctors Available" 
          value="12/15" 
          icon={<Stethoscope size={20} />} 
          trend="3 on rest" 
          trendType="neutral" 
          color="--primary"
        />
        <StatCard 
          label="Emergency Cases" 
          value="02" 
          icon={<AlertCircle size={20} />} 
          trend="Immediate attention" 
          trendType="negative" 
          color="--accent"
        />
      </div>

      <div className="content-split">
        {/* Charts Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Patient Flow & Wait Time Trend</h2>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} /> Patients
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} /> Wait Time
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.6 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.6 }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1rem', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '1rem' 
                  }} 
                />
                <Area type="monotone" dataKey="patients" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="wait" stroke="var(--secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorWait)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="stats-grid" style={{ gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', height: '300px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Doctor Workload Distribution</h2>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={doctorLoad}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, opacity: 0.6 }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="patients" radius={[6, 6, 0, 0]} barSize={25}>
                    {doctorLoad.map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.patients > 5 ? 'var(--danger)' : index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card" 
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}
            >
              <TrendingUp size={48} color="var(--secondary)" />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>94.5%</h3>
                <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>Queue Efficiency Score</p>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 600, padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '1rem' }}>
                Peak Performance
              </div>
            </motion.div>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ 
            padding: '1.5rem', 
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(34, 197, 94, 0.05))',
            border: '1px solid rgba(37, 99, 235, 0.1)',
            minHeight: '400px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              <BrainCircuit size={20} />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>AI Optimization Panel</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Reallocation Suggestion', desc: 'Move 3 patients from Dr. Johnson to Dr. Chen to balance load.', icon: <Users size={16} />, color: 'var(--primary)' },
                { title: 'Wait Time Alert', desc: 'Pediatrics queue exceeds current threshold. Recommend backup deployment.', icon: <Clock size={16} />, color: 'var(--accent)' },
                { title: 'Bottleneck Detected', desc: 'ECG testing room is at 95% capacity. Delaying low-priority cases.', icon: <Activity size={16} />, color: 'var(--danger)' }
              ].map((insight, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 5 }}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '0.75rem', 
                    background: 'var(--background)',
                    border: `1px solid ${insight.color}33`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: insight.color }}>
                    {insight.icon}
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{insight.title}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.4 }}>{insight.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link href="/insights" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '0.8rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}>
                <span>View Full AI Insights</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Registration</h3>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input 
                type="text" 
                placeholder="Patient Name" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                style={{ padding: '0.6rem', border: '1px solid var(--sidebar-border)', borderRadius: '0.5rem', background: 'transparent', color: 'inherit', outline: 'none' }} 
              />
              <select style={{ padding: '0.6rem', border: '1px solid var(--sidebar-border)', borderRadius: '0.5rem', background: 'var(--background)', color: 'inherit', outline: 'none' }}>
                <option>Emergency Priority</option>
                <option>High Priority</option>
                <option>Normal Care</option>
              </select>
              <button type="submit" className="btn-primary" style={{ padding: '0.8rem', borderRadius: '0.75rem', fontWeight: 700 }}>Generate Token</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
