import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#e8e8e8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052a3] focus:border-[#0052a3] transition-all duration-300 shadow-sm hover:border-[#0052a3] text-[#1a2332] placeholder-[#94a3b8]"
      />
    </div>
  );
}
