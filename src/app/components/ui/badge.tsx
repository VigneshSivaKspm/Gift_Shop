import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-[#22C55E] text-white',
    warning: 'bg-[#F59E0B] text-white',
    error: 'bg-[#EF4444] text-white',
    info: 'bg-[#2563EB] text-white',
    default: 'bg-[#E5E7EB] text-[#111827]'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
