'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BrainCircuit,
  Users,
  Clock,
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  Stethoscope,
  Database,
  Target,
  ArrowRight,
  DollarSign,
  PieChart,
  BarChart,
  Globe,
  Rocket
} from 'lucide-react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 'cover',
    title: 'CareQueue',
    subtitle: 'The Healthcare Operating System',
    content: (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          style={{
            background: 'var(--primary)',
            width: '140px',
            height: '140px',
            borderRadius: '2.5rem',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 50px rgba(37, 99, 235, 0.4)',
            position: 'relative'
          }}
        >
          <div className="animate-ping" style={{ position: 'absolute', inset: 0, border: '2px solid var(--primary)', borderRadius: 'inherit', opacity: 0.3 }} />
          <Stethoscope size={72} color="white" />
        </motion.div>
        <h1 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.25rem', lineHeight: 1 }}>CareQueue</h1>
        <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', opacity: 0.6, maxWidth: '700px', margin: '0 auto', fontWeight: 500, lineHeight: 1.5, padding: '0 1rem' }}>
          Orchestrating the future of patient flow with predictive intelligence.
        </p>
        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>#SaaS</div>
          <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>#HealthTech</div>
          <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>#GenerativeAI</div>
        </div>
      </div>
    )
  },
  {
    id: 'problem',
    title: 'The Problem',
    subtitle: 'A $120B Operational Vacuum',
    content: (
      <div className="slides-grid grid-2" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {[
            {
              label: 'The Waiting Crisis',
              val: 'Patients spend 25% of their hospital journey in wait.',
              icon: <Clock size={28} color="#EF4444" />,
              stat: '2.4hr avg wait'
            },
            {
              label: 'Resource Staticity',
              val: 'Fixed doctor schedules fail to adapt to live patient complexity.',
              icon: <Activity size={28} color="#F59E0B" />,
              stat: '30% idle time'
            },
            {
              label: 'Manual Triage',
              val: 'Subjective prioritization leads to preventable emergency escalation.',
              icon: <ShieldCheck size={28} color="#2563EB" />,
              stat: '12% mis-triage'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '1.25rem', background: 'var(--card-bg)', border: '1px solid var(--sidebar-border)', borderRadius: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>{item.label}</h3>
                <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '0.4rem', lineHeight: 1.5 }}>{item.val}</p>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)' }}>{item.stat}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="glass-card slide-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', filter: 'blur(30px)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#EF4444', marginBottom: '3rem', letterSpacing: '0.2em' }}>Impact Loss</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900, marginBottom: '0.2rem' }}>$120B</h4>
              <p style={{ opacity: 0.5, fontSize: '0.8rem', fontWeight: 600 }}>Annual Hospital Leakage (US)</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900, marginBottom: '0.2rem' }}>-42%</h4>
              <p style={{ opacity: 0.5, fontSize: '0.8rem', fontWeight: 600 }}>Patient Satisfaction Index</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'solution',
    title: 'The Solution',
    subtitle: 'Healthcare Re-Orchestrated',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="slides-grid grid-3">
          {[
            {
              title: 'Predictive Triage',
              desc: 'ML models analyze symptoms, vitals, and current queue saturation to bypass the wait.',
              icon: <BrainCircuit size={48} />,
              highlight: '94% Accuracy'
            },
            {
              title: 'Dynamic Load Balancing',
              desc: 'AI assigns physicians in real-time based on cognitive load and clinical performance.',
              icon: <Zap size={48} />,
              highlight: 'Instant Allocation'
            },
            {
              title: 'Autonomous Flow',
              desc: 'Self-adjusting queue logic that reacts to surgical delays and emergency spikes.',
              icon: <ShieldCheck size={48} />,
              highlight: 'Zero Downtime'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="glass-card slide-card"
              whileHover={{ y: -10 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: 800 }}>{item.highlight}</div>
              <div style={{ margin: '0 auto 1rem', color: 'var(--primary)' }}>{React.cloneElement(item.icon as any, { size: 32 })}</div>
              <h3 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ opacity: 0.6, lineHeight: 1.4, fontSize: '0.8rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="glass-card" style={{ padding: '1rem', background: 'linear-gradient(90deg, rgba(37,99,235,0.1), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem' }}>
            <div style={{ padding: '1rem', background: 'var(--primary)', borderRadius: '1rem', color: 'white' }}><Cpu size={32} /></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: 800 }}>Integrated AI Engine</h4>
              <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Proprietary neural ranking engine optimized for clinical triage protocols.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'how-it-works',
    title: 'How We Solve This',
    subtitle: 'Strategic Implementation Fix',
    content: (
      <div className="slides-grid grid-2" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            {
              title: 'Smart Queue Intelligence',
              desc: 'By feeding real-time physiological data into our neural engine, we eliminate manual clerical errors in triage.',
              icon: <Zap color="var(--primary)" />
            },
            {
              title: 'Dynamic Resource Sync',
              desc: 'Physicians are automatically tagged and assigned based on availability and specialty matches via real-time HUDs.',
              icon: <Activity color="var(--primary)" />
            },
            {
              title: 'Predictive Load Management',
              desc: 'Fixing the "emergency spike" problem by anticipating patient surges 2 hours in advance using historical patterns.',
              icon: <TrendingUp color="var(--primary)" />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
            >
              <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '1.25rem', borderRadius: '1rem' }}>{item.icon}</div>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{item.title}</h4>
                <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <img 
            src="/healthcare_ai_fix_flow_1775380026487.png" 
            alt="AI Solution Flow" 
            style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--bg) 100%)', borderRadius: '2rem' }} />
        </div>
      </div>
    )
  },
  {
    id: 'market',
    title: 'Market Opportunity',
    subtitle: 'Untapped Frontier',
    content: (
      <div className="slides-grid grid-2" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { label: 'TAM', title: 'Global HealthTech Ops', val: '$32.4B' },
            { label: 'SAM', title: 'Intelligent Hospital Systems', val: '$8.2B' },
            { label: 'SOM', title: 'Predictive Flow Market', val: '$1.4B' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '2.5rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--sidebar-border)',
                borderRadius: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.2em' }}>{item.label}</span>
                <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 800 }}>{item.title}</h3>
              </div>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900, color: 'var(--primary)' }}>{item.val}</div>
            </motion.div>
          ))}
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ width: '100%', height: '400px', background: 'radial-gradient(circle at center, rgba(37,99,235,0.1) 0%, transparent 70%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ width: '350px', height: '350px', border: '2px dashed var(--sidebar-border)', borderRadius: '50%', position: 'absolute' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              style={{ width: '250px', height: '250px', border: '2px dashed var(--primary)', borderRadius: '50%', opacity: 0.3, position: 'absolute' }}
            />
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              <Globe size={120} color="var(--primary)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
              <h4 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Global Scalability</h4>
              <p style={{ opacity: 0.5, maxWidth: '250px', margin: '0 auto' }}>Localized for multi-language and diverse clinical frameworks.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'product',
    title: 'The Platform',
    subtitle: 'Unified Hospital OS',
    content: (
      <div className="slides-grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.4)', border: '4px solid rgba(255,255,255,0.1)' }}>
          <img
            src="/hospital_ai_visualization.png"
            alt="CareQueue Dashboard Preview"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <BrainCircuit size={24} />
                <h4 style={{ fontWeight: 800 }}>LIVE Optimization Engine</h4>
              </div>
              <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div animate={{ width: ['20%', '90%', '75%'] }} transition={{ duration: 5, repeat: Infinity }} style={{ height: '100%', background: 'var(--primary)' }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            { t: 'Clinician HUD', d: 'Real-time patient flow & physician cognitive load metrics.', icon: <LayoutDashboard /> },
            { t: 'Patient Portal', d: 'Seamless token registry with AI-backed wait predictions.', icon: <Users /> },
            { t: 'Predictive Insights', d: 'Strategic workforce modeling and bottleneck forensics.', icon: <Activity /> }
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ width: 'clamp(44px, 8vw, 56px)', height: 'clamp(44px, 8vw, 56px)', background: 'var(--primary)', borderRadius: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                {React.cloneElement(f.icon as any, { size: 24 })}
              </div>
              <div>
                <h4 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: 800, marginBottom: '0.2rem' }}>{f.t}</h4>
                <p style={{ opacity: 0.6, fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', lineHeight: 1.4 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'business',
    title: 'Business Model',
    subtitle: 'Scalable Recurring Revenue',
    content: (
      <div className="slides-grid grid-3">
        {[
          {
            plan: 'Core Integration',
            price: '$2.5k',
            target: 'Per Hospital / Mo',
            features: ['Patient Dashboard', 'Basic ML Prediction', 'Email Notifications']
          },
          {
            plan: 'Enterprise OS',
            price: '$7.5k',
            target: 'Per Hospital / Mo',
            features: ['Full AI Orchestration', 'Physician Load Balancing', 'Integrations (Epic/Cerner)', '24/7 Priority Support'],
            premium: true
          },
          {
            plan: 'Regional Network',
            price: 'Custom',
            target: 'Volume Pricing',
            features: ['Cross-Hospital Flow', 'City-Wide Analytics', 'Government Hub Access', 'API Developer Access']
          }
        ].map((tier, i) => (
          <div
            key={i}
            className="glass-card slide-card"
            style={{
              textAlign: 'center',
              border: tier.premium ? '2px solid var(--primary)' : '1px solid var(--sidebar-border)',
              background: tier.premium ? 'rgba(37,99,235,0.03)' : 'var(--card-bg)'
            }}
          >
            {tier.premium && <div style={{ background: 'var(--primary)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block' }}>Most Popular</div>}
            <h3 style={{ fontSize: '1rem', fontWeight: 800, opacity: 0.6, marginBottom: '0.5rem' }}>{tier.plan}</h3>
            <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '0.2rem' }}>{tier.price}</div>
            <p style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '2rem' }}>{tier.target}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left' }}>
              {tier.features.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'traction',
    title: 'Traction & Roadmap',
    subtitle: 'From Hackathon to Scale',
    content: (
      <div style={{ position: 'relative', paddingTop: '1.5rem' }}>
        <div style={{ position: 'absolute', top: '32px', left: '0', right: '0', height: '4px', background: 'var(--sidebar-border)', zIndex: 0 }} className="mobile-hide" />
        <div className="slides-grid grid-4" style={{ position: 'relative', zIndex: 1, gap: '2rem' }}>
          {[
            { date: 'Q2 2026', title: 'Beta V1', desc: 'Hackathon POC completed. Deployment to first 3 clinics for data gathering.', icon: <Rocket />, active: true },
            { date: 'Q4 2026', title: 'Scale V2', desc: 'Machine Learning model refined with real-world clinical data. Full hospital pilot.', icon: <TrendingUp /> },
            { date: 'Q2 2027', title: 'Public API', desc: 'Enabling developer ecosystem to build customized health apps on CareQueue.', icon: <Cpu /> },
            { date: 'Q4 2027', title: 'Global 100', desc: 'Onboarding 100+ tier-1 hospitals across 5 countries.', icon: <Globe /> }
          ].map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: step.active ? 'var(--primary)' : 'var(--card-bg)',
                border: `3px solid ${step.active ? 'white' : 'var(--sidebar-border)'}`,
                borderRadius: '50%',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: step.active ? 'white' : 'var(--foreground)',
                boxShadow: step.active ? '0 0 25px rgba(37,99,235,0.4)' : 'none'
              }}>
                {React.cloneElement(step.icon as any, { size: 24 })}
              </div>
              <h4 style={{ fontWeight: 900, color: 'var(--primary)', marginBottom: '0.2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{step.date}</h4>
              <h3 style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 800, marginBottom: '0.4rem' }}>{step.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '0.7rem', lineHeight: 1.4, maxWidth: '160px', margin: '0 auto' }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass-card slide-card" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>Currently seeking <span style={{ color: 'var(--primary)', fontWeight: 800 }}>$1.5M Seed Funding</span> to accelerate R&D and team acquisition.</p>
        </div>
      </div>
    )
  },
  {
    id: 'team',
    title: 'The Team',
    subtitle: 'Built by Engineers, Powered by Medicine',
    content: (
      <div className="slides-grid grid-3">
        {[
          { name: 'Sachin Yadav', role: 'Head', desc: '15+ Years in clinical operations, Ex-Management at Sloan Kettering.', icon: <Stethoscope size={64} /> },
          { name: 'Shruti .', role: 'Head of Engineering', desc: 'Deep Learning specialist, formerly Core ML Engineer at Tesla.', icon: <Cpu size={64} /> },
          { name: 'Md. Arshad Alam', role: 'Operations & Strategy', desc: 'Scaling Expert, led previous HealthTech exit in 2023.', icon: <Users size={64} /> }
        ].map((m, i) => (
          <div key={i} className="glass-card slide-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'var(--sidebar-border)',
              borderRadius: '50%',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              border: '4px solid white'
            }}>{m.icon}</div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, marginBottom: '0.4rem' }}>{m.name}</h3>
            <p style={{ fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>{m.role}</p>
            <p style={{ opacity: 0.6, lineHeight: 1.5, fontSize: '0.95rem' }}>{m.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'final',
    title: 'Own the Future',
    subtitle: 'Zero Wait. Infinite Care.',
    content: (
      <div style={{ textAlign: 'center', marginTop: 'min(5vh, 2rem)' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1.5px', lineHeight: 1.1 }}>Join the <span style={{ color: 'var(--primary)' }}>Healthcare Revolution</span></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginBottom: '4rem' }}>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ padding: '1rem 2.5rem', fontSize: 'min(1.2rem, 4vw)', borderRadius: '2.5rem', fontWeight: 800, boxShadow: '0 20px 40px rgba(37,99,235,0.3)' }}
            >
              Launch Platform Demo
            </motion.button>
          </Link>
          <button
            className="glass-panel"
            style={{ padding: '1rem 2.5rem', fontSize: 'min(1.2rem, 4vw)', borderRadius: '2.5rem', fontWeight: 800, border: '2px solid var(--primary)', color: 'var(--primary)', cursor: 'pointer' }}
          >
            Request Investor Relations
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', opacity: 0.4, fontWeight: 700, fontSize: '0.9rem' }}>
          <span>carequeue.ai</span>
          <span>college@collegecrave.in</span>
          <span>+1 800 CARE AI</span>
        </div>
      </div>
    )
  }
];

export default function Slides() {
  const [current, setCurrent] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const total = SLIDES.length;
  const progress = ((current + 1) / total) * 100;

  React.useEffect(() => {
    setMounted(true);
  }, []);


  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) return (
    <div style={{ height: '100vh', width: '100vw', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="status-indicator" style={{ width: '20px', height: '20px' }} />
    </div>
  );

  return (

    <div className="slides-page-container">
      {/* Animated Background Decorations */}
      <div style={{ position: 'fixed', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      {/* Slide Navigation Overlay */}
      <div className="slides-nav-overlay">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Stethoscope size={24} />
          </div>
          <span className="gradient-text uppercase" style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.15em' }}>CareQueue Pitch Deck</span>
        </div>

        <div style={{ flex: 1, margin: '0 4rem', position: 'relative', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            style={{ position: 'absolute', height: '100%', background: 'var(--primary)', borderRadius: 'inherit', boxShadow: '0 0 15px rgba(37,99,235,0.3)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: i === current ? '35px' : '10px',
                height: '10px',
                background: i === current ? 'var(--primary)' : 'var(--sidebar-border)',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={current}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="slide-section"
        >
          <div style={{ maxWidth: '1400px', width: '100%' }}>
            <div className="slide-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.75rem', display: 'block' }}
              >
                {SLIDES[current].subtitle}
              </motion.span>
              <motion.h1
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {SLIDES[current].title}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {SLIDES[current].content}
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Floating Controls */}
      <div className="slides-controls-overlay">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', marginRight: '1rem' }} className="slide-counter">
          <span style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.5 }}>Slide</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)' }}>{current + 1} / {total}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(37,99,235,0.1)' }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="glass-panel"
          style={{ width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--primary)', border: '1.5px solid rgba(37,99,235,0.2)' }}
        >
          <ChevronLeft size={32} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="btn-primary control-btn"
          style={{ width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(37,99,235,0.3)' }}
        >
          <ChevronRight size={32} color="white" />
        </motion.button>
      </div>

      <div className="slides-footer-status">
        <div className="status-indicator" />
        <span className="status-text">INVESTOR PREVIEW MODE • LIVE 2026</span>
      </div>
    </div>
  );
}
