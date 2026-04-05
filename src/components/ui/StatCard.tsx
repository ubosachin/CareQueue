'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

export default function StatCard({ label, value, icon, trend, trendType = 'neutral', color = 'var(--primary)' }: StatCardProps) {
  const isPositive = trendType === 'positive';
  const isNegative = trendType === 'negative';

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 20px 25px -5px ${color}22, 0 8px 10px -6px ${color}22` }}
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        flex: 1,
        minWidth: '220px',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${color}15`
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '60px',
        height: '60px',
        background: `${color}11`,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: `${color}22`,
          color: color,
          padding: '0.6rem',
          borderRadius: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
        
        {trend && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: isPositive ? 'var(--secondary)' : isNegative ? 'var(--danger)' : 'grey',
            background: isPositive ? 'rgba(34, 197, 94, 0.1)' : isNegative ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0,0,0,0.05)',
            padding: '0.2rem 0.6rem',
            borderRadius: '1rem'
          }}>
            {isPositive ? <TrendingUp size={12} /> : isNegative ? <TrendingDown size={12} /> : null}
            {trend}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '0.85rem', opacity: 0.6, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em' }}>{value}</span>
      </div>
    </motion.div>
  );
}
