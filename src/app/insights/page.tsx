'use client';

import React from 'react';
import { 
  BrainCircuit, 
  Lightbulb, 
  TrendingDown, 
  TrendingUp,
  Zap, 
  ShieldAlert, 
  Users, 
  Clock, 
  MessageSquare,
  ArrowUpRight,
  Stethoscope,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INSIGHTS = [
  {
    id: 1,
    type: 'Optimization',
    title: 'Predicted Surge in Emergency (14:00 - 16:00)',
    description: 'AI model predicts a 25% increase in trauma arrivals this afternoon. Recommended: Reallocate 1 General Medicine physician to Triage.',
    impact: 'High',
    efficiency: '+18%',
    category: 'bottleneck'
  },
  {
    id: 2,
    type: 'Staffing',
    title: 'Cardiology Clinic Saturation',
    description: 'Dr. Sarah Johnson is currently handling average of 8.2 active tokens. Suggested to activate virtual check-in for non-priority cases.',
    impact: 'Medium',
    efficiency: '+12%',
    category: 'utilization'
  },
  {
    id: 3,
    type: 'Strategic',
    title: 'Wait-time Paradox in Pediatrics',
    description: 'Pediatric wait times have increased while patient volume decreased. Root cause: Physician documentation latency between patients.',
    impact: 'Medium',
    efficiency: '+24%',
    category: 'quality'
  }
];

export default function InsightsPage() {
  return (
    <div className="flex-col-responsive" style={{ gap: '2rem' }}>
        <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.02em' }}>
               <BrainCircuit className="animate-pulse-subtle" color="var(--primary)" size={36} />
               AI Clinical Insights
            </h1>
            <p style={{ opacity: 0.6, fontWeight: 500, fontSize: '1rem' }}>Proactive medical recommendations and bottleneck predictions.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', width: 'auto', flexWrap: 'wrap' }}>
            <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', fontWeight: 600, border: '1px solid var(--sidebar-border)' }}>
              <Zap size={18} fill="var(--primary)" /> Smart Audit
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} /> Re-Generate
            </button>
          </div>
        </div>

        <div className="stats-grid">
        {[
          { label: 'AI Prediction Accuracy', val: '94.2%', icon: <Target size={24} />, color: 'var(--primary)' },
          { label: 'Active Recommendations', val: '12', icon: <Lightbulb size={24} />, color: 'var(--secondary)' },
          { label: 'Estimated ROI Gain', val: '+$14.2k/mo', icon: <TrendingUp size={24} />, color: 'var(--accent)' }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5, boxShadow: `0 20px 25px -5px ${stat.color}11` }}
            className="glass-card" 
            style={{ padding: '1.5rem', border: `1px solid ${stat.color}15`, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ color: stat.color, marginBottom: '0.5rem', background: `${stat.color}11`, width: 'fit-content', padding: '0.6rem', borderRadius: '0.75rem' }}>
              {stat.icon}
            </div>
            <p style={{ opacity: 0.5, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
            <h3 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{stat.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="content-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Critical Recommendations</h2>
           {INSIGHTS.map((insight, index) => (
             <motion.div 
               key={insight.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="glass-card" 
               style={{ padding: '2rem', position: 'relative', overflow: 'hidden', border: '1px solid var(--sidebar-border)' }}
             >
                {/* Accent line based on impact */}
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  bottom: 0, 
                  left: 0, 
                  width: '4px', 
                  background: insight.impact === 'High' ? 'var(--danger)' : 'var(--primary)'
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
                   <div>
                     <span style={{ 
                       background: 'rgba(37, 99, 235, 0.1)', 
                       padding: '0.4rem 0.85rem', 
                       borderRadius: '2rem', 
                       fontSize: '0.7rem', 
                       fontWeight: 800,
                       color: 'var(--primary)',
                       textTransform: 'uppercase'
                     }}>
                       {insight.type}
                     </span>
                     <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '-0.01em' }}>{insight.title}</h3>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.4, textTransform: 'uppercase' }}>Efficiency Boost</p>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--secondary)' }}>{insight.efficiency}</span>
                   </div>
                </div>
                
                <p style={{ opacity: 0.7, fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {insight.description}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                   <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.9rem' }}>
                     Execute Optimization
                   </button>
                   <button className="glass-panel" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.9rem', fontWeight: 700, border: '1px solid var(--sidebar-border)' }}>
                     Review Details
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>AI Performance Heatmap</h2>
           <div className="glass-card" style={{ padding: '2rem', height: 'fit-content' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {Array.from({ length: 49 }).map((_, i) => {
                  const intensity = Math.random();
                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      style={{ 
                        width: '100%', 
                        paddingTop: '100%', 
                        background: i % 7 === 2 || i % 7 === 5 ? 'var(--primary)' : 'rgba(37, 99, 235, 0.1)', 
                        borderRadius: '4px',
                        opacity: intensity > 0.5 ? intensity : 0.2
                      }} 
                    />
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.75rem', fontWeight: 700, opacity: 0.5 }}>
                 <span>MON</span>
                 <span>SUN</span>
              </div>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '1rem' }}>
                 <p style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert size={16} /> 
                    AI System Log
                 </p>
                 <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.6 }}>
                    Predictive accuracy remains above 90% for Tuesday shifts. No anomalies detected in patient re-prioritization pipeline.
                 </p>
              </div>
           </div>

           <div className="glass-card" style={{ padding: '2rem' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Specialty Prediction</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Cardiology', val: 88 },
                  { name: 'Orthopedics', val: 42 },
                  { name: 'Pediatrics', val: 65 }
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <span>{s.name}</span>
                      <span>{s.val}% Load</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${s.val}%` }}
                        transition={{ duration: 1 }}
                        style={{ height: '100%', background: 'var(--primary)' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Helper icons that were missing
const Target = ({ size, color }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
