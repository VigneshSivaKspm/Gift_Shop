import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'soft' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold';
  
  const variants = {
    primary: 'bg-[#0052a3] text-white hover:bg-[#003d7a] shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#0052a3] text-[#0052a3] hover:bg-[#e8f0ff] transition-all',
    soft: 'bg-[#e8f0ff] text-[#0052a3] hover:bg-[#d0e1ff]',
    destructive: 'bg-[#ef4444] text-white hover:bg-[#dc2626] shadow-md hover:shadow-lg',
    ghost: 'text-[#0052a3] hover:bg-[#e8f0ff]'
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
