import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-[#1a2332] mb-2.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 border-[#e8e8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052a3] focus:border-[#0052a3] transition-all duration-300 text-[#1a2332] placeholder-[#94a3b8] hover:border-[#0052a3] ${error ? 'border-[#ef4444]' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm font-semibold text-[#dc2626]">{error}</p>
      )}
    </div>
  );
}
