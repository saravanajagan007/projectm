'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  PlusCircle,
  Pencil,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Phone,
  Mail,
  User,
  ShieldCheck,
  UserCheck,
  Eye,
} from 'lucide-react';
import { CompanyDto, PaginationMeta } from '@projectm/shared';
import { useAuth } from '../../../../lib/auth-context';
import { api } from '../../../../lib/api';
import { formatImageUrl } from '../../../../lib/utils';
import { SearchInput } from '../../../../components/SearchInput';
import { Pagination } from '../../../../components/Pagination';
import { EditCompanyModal } from '../../../../components/EditCompanyModal';
import { DeleteConfirmModal } from '../../../../components/DeleteConfirmModal';
import { CompanyGalleryModal } from '../../../../components/CompanyGalleryModal';
import { useModal } from '../../../../lib/modal-context';

export default function ManageCompaniesPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { openAddCompany, refreshTrigger } = useModal();

  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal State (Admin only)
  const [editingCompany, setEditingCompany] = useState<CompanyDto | null>(null);

  // Delete Modal State (Admin only)
  const [deletingCompany, setDeletingCompany] = useState<CompanyDto | null>(null);

  // Gallery Modal State (Accessible to all)
  const [viewingCompany, setViewingCompany] = useState<CompanyDto | null>(null);

  const fetchCompanies = useCallback(
    async (pageToLoad = meta.page, limitToLoad = meta.limit, searchTerm = search) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getCompanies({
          page: pageToLoad,
          limit: limitToLoad,
          search: searchTerm,
        });
        setCompanies(response.data);
        setMeta(response.meta);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    },
    [meta.page, meta.limit, search],
  );

  useEffect(() => {
    if (!authLoading) {
      fetchCompanies(1, meta.limit, search);
    }
  }, [authLoading, search, refreshTrigger]);

  if (authLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mb-2" />
        <p className="text-sm font-semibold text-slate-500">Loading company records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header Card in Emerald Theme */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                Manage Companies
              </h1>
              {isAdmin ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-700" />
                  ADMIN
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                  <UserCheck className="h-3.5 w-3.5 mr-1 text-slate-600" />
                  ADD_COMPANY
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isAdmin
                ? 'Add, search, edit, manage photos, and delete company listings.'
                : 'Add new companies, search records, and browse company photo galleries.'}
            </p>
          </div>
        </div>

        {/* Action Button: Add Company (Visible to BOTH roles) */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={openAddCompany}
            className="inline-flex items-center px-5 py-2.5 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search by company name, contact person, phone number, or email..."
        />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchCompanies(meta.page, meta.limit, search)}
            className="text-xs font-bold underline hover:text-red-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-500">Loading company records...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="py-16 text-center p-8">
            <p className="text-base font-bold text-slate-800 mb-1">No companies found</p>
            <p className="text-xs text-slate-400 mb-5">
              {search
                ? 'No records match your search criteria. Try a different query.'
                : 'No companies registered yet. Get started by adding one.'}
            </p>
            <button
              onClick={openAddCompany}
              className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm cursor-pointer"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add Company
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Contact Person
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Contact Numbers
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Photos
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company) => {
                  const hasImages = company.images && company.images.length > 0;
                  const firstImage = hasImages ? company.images[0] : null;

                  return (
                    <tr
                      key={company.id}
                      className="hover:bg-emerald-50/20 transition-colors group"
                    >
                      {/* Name & Thumbnail */}
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <div className="flex items-center space-x-3.5">
                          <div
                            onClick={() => hasImages && setViewingCompany(company)}
                            className={`h-11 w-11 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 flex items-center justify-center ${
                              hasImages ? 'cursor-pointer hover:ring-2 hover:ring-emerald-500' : ''
                            }`}
                            title={hasImages ? 'Click to open photo gallery' : 'No photos available'}
                          >
                            {firstImage ? (
                              <img
                                src={formatImageUrl(firstImage.url)}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 text-sm block">
                              {company.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Added {new Date(company.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact Person */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                          <User className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{company.contactPerson || 'Not Specified'}</span>
                        </div>
                      </td>

                      {/* Contact Numbers with Country Code */}
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                            <Phone className="h-3 w-3 text-emerald-600" />
                            <span>{company.contactNumber}</span>
                          </div>
                          {company.alternateContactNumber && (
                            <div className="text-slate-500 text-[11px] font-medium">
                              Alt: {company.alternateContactNumber}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        {company.email ? (
                          <div className="flex items-center space-x-1.5 text-xs text-slate-700">
                            <Mail className="h-3 w-3 text-slate-400" />
                            <a
                              href={`mailto:${company.email}`}
                              className="text-emerald-700 hover:text-emerald-800 hover:underline font-medium"
                            >
                              {company.email}
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">None</span>
                        )}
                      </td>

                      {/* Images count with gallery modal preview */}
                      <td className="px-6 py-4">
                        {hasImages ? (
                          <button
                            type="button"
                            onClick={() => setViewingCompany(company)}
                            className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 transition-colors cursor-pointer"
                          >
                            <ImageIcon className="h-3.5 w-3.5 mr-1" />
                            <span>{company.images.length} Photos</span>
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">0 Photos</span>
                        )}
                      </td>

                      {/* Created By */}
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {company.createdBy?.email ? (
                          <div>
                            <span className="font-semibold text-slate-700 block truncate max-w-[140px]">
                              {company.createdBy.email}
                            </span>
                            <span className="inline-block text-[10px] text-slate-400 font-mono">
                              {company.createdBy.role}
                            </span>
                          </div>
                        ) : (
                          <span>System</span>
                        )}
                      </td>

                      {/* Actions: Admin gets Edit & Delete; Operator gets View Gallery */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {isAdmin ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setEditingCompany(company)}
                                className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                                title="Edit Company"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeletingCompany(company)}
                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                title="Delete Company"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => hasImages && setViewingCompany(company)}
                              disabled={!hasImages}
                              className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
                              title="View Gallery"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Server-Side Pagination */}
        {companies.length > 0 && (
          <div className="p-3 border-t border-slate-100">
            <Pagination
              meta={meta}
              onPageChange={(p) => fetchCompanies(p, meta.limit, search)}
              onLimitChange={(l) => fetchCompanies(1, l, search)}
            />
          </div>
        )}
      </div>

      {/* Edit Company Modal (Admin only) */}
      {isAdmin && (
        <EditCompanyModal
          isOpen={!!editingCompany}
          company={editingCompany}
          onClose={() => setEditingCompany(null)}
          onSuccess={() => {
            fetchCompanies(meta.page, meta.limit, search);
          }}
        />
      )}

      {/* Delete Confirmation Modal (Admin only) */}
      {isAdmin && (
        <DeleteConfirmModal
          isOpen={!!deletingCompany}
          company={deletingCompany}
          onClose={() => setDeletingCompany(null)}
          onSuccess={() => {
            fetchCompanies(1, meta.limit, search);
          }}
        />
      )}

      {/* Image Gallery Modal (Accessible to all) */}
      {viewingCompany && (
        <CompanyGalleryModal
          isOpen={!!viewingCompany}
          companyName={viewingCompany.name}
          images={viewingCompany.images}
          onClose={() => setViewingCompany(null)}
        />
      )}
    </div>
  );
}
