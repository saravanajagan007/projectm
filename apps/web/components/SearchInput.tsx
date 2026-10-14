'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value: initialValue,
  onChange,
  placeholder = 'Search by name, contact, alt contact, or email...',
  className = '',
}: SearchInputProps) {
  const [val, setVal] = useState(initialValue);

  // Sync internal state if prop changes externally
  useEffect(() => {
    setVal(initialValue);
  }, [initialValue]);

  // Debounce 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (val !== initialValue) {
        onChange(val);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [val, onChange, initialValue]);

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
      />
      {val && (
        <button
          type="button"
          onClick={() => {
            setVal('');
            onChange('');
          }}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
