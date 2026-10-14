'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { CompanyDto } from '@projectm/shared';
import { api } from '../lib/api';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  company: CompanyDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  company,
  onClose,
  onSuccess,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !company) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await api.deleteCompany(company.id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to delete company');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Delete Company</h3>
            <p className="text-xs text-slate-500">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Are you sure you want to permanently delete{' '}
          <strong className="text-slate-900 font-semibold">{company.name}</strong>? All
          associated information and{' '}
          <span className="font-semibold text-red-600">
            {company.images?.length || 0} uploaded image(s)
          </span>{' '}
          will be removed immediately.
        </p>

        {error && (
          <div className="p-3 mb-4 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
