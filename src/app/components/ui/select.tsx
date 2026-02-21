import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111827] mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border border-[#E5E7EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white transition-all ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
