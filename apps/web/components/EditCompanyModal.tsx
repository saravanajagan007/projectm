'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  UploadCloud,
  Building,
  User,
  Phone,
  Mail,
  Loader2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Undo2,
} from 'lucide-react';
import {
  createCompanySchema,
  CreateCompanyInput,
  CompanyDto,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_COMPANY_IMAGES,
  DEFAULT_COUNTRY_CODES,
} from '@projectm/shared';
import { api } from '../lib/api';
import { formatImageUrl } from '../lib/utils';

interface EditCompanyModalProps {
  isOpen: boolean;
  company: CompanyDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface ImagePreviewItem {
  file: File;
  previewUrl: string;
}

function parsePhoneField(fullNumber?: string | null): { countryCode: string; number: string } {
  if (!fullNumber) return { countryCode: '+91', number: '' };
  const trimmed = fullNumber.trim();
  const parts = trimmed.split(' ');
  if (parts.length > 1 && parts[0].startsWith('+')) {
    return { countryCode: parts[0], number: parts.slice(1).join('').replace(/\D/g, '') };
  }
  for (const c of DEFAULT_COUNTRY_CODES) {
    if (trimmed.startsWith(c.code)) {
      return { countryCode: c.code, number: trimmed.slice(c.code.length).replace(/\D/g, '') };
    }
  }
  return { countryCode: '+91', number: trimmed.replace(/\D/g, '') };
}

export function EditCompanyModal({
  isOpen,
  company,
  onClose,
  onSuccess,
}: EditCompanyModalProps) {
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<ImagePreviewItem[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      contactCountryCode: '+91',
      contactNumber: '',
      alternateContactCountryCode: '+91',
      alternateContactNumber: '',
      email: '',
    },
  });

  useEffect(() => {
    if (company) {
      const parsedContact = parsePhoneField(company.contactNumber);
      const parsedAltContact = parsePhoneField(company.alternateContactNumber);

      reset({
        name: company.name || '',
        contactPerson: company.contactPerson || '',
        contactCountryCode: parsedContact.countryCode,
        contactNumber: parsedContact.number,
        alternateContactCountryCode: parsedAltContact.countryCode,
        alternateContactNumber: parsedAltContact.number,
        email: company.email || '',
      });
      setDeletedImageIds([]);
      setNewImages([]);
      setFileError(null);
      setSubmitError(null);
      setSuccessMsg(null);
    }
  }, [company, reset]);

  if (!isOpen || !company) return null;

  // Calculate current retained images count + new uploads
  const existingImages = company.images || [];
  const retainedExistingImages = existingImages.filter((img) => !deletedImageIds.includes(img.id));
  const currentTotalImages = retainedExistingImages.length + newImages.length;

  const handleFiles = (files: FileList | null) => {
    setFileError(null);
    if (!files || files.length === 0) return;

    if (currentTotalImages + files.length > MAX_COMPANY_IMAGES) {
      setFileError(
        `Maximum ${MAX_COMPANY_IMAGES} images allowed per company. Currently you will have ${currentTotalImages + files.length} images. Remove existing images or select fewer new photos.`,
      );
      return;
    }

    const newPreviewItems: ImagePreviewItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
        setFileError(`File "${file.name}" is not an accepted image format (.jpg, .jpeg, .png, .webp).`);
        return;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        setFileError(`File "${file.name}" exceeds maximum allowed size (5MB).`);
        return;
      }

      newPreviewItems.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    setNewImages((prev) => [...prev, ...newPreviewItems]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const markImageForDeletion = (imageId: string) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
    setFileError(null);
  };

  const unmarkImageForDeletion = (imageId: string) => {
    if (currentTotalImages + 1 > MAX_COMPANY_IMAGES) {
      setFileError(`Cannot restore this photo: maximum of ${MAX_COMPANY_IMAGES} total images reached.`);
      return;
    }
    setDeletedImageIds((prev) => prev.filter((id) => id !== imageId));
    setFileError(null);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
    setFileError(null);
  };

  const handleClose = () => {
    newImages.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setNewImages([]);
    setDeletedImageIds([]);
    setFileError(null);
    setSubmitError(null);
    setSuccessMsg(null);
    onClose();
  };

  const onSubmit = async (data: CreateCompanyInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('contactPerson', data.contactPerson);
      formData.append('contactCountryCode', data.contactCountryCode || '+91');
      formData.append('contactNumber', data.contactNumber);

      if (data.alternateContactCountryCode) {
        formData.append('alternateContactCountryCode', data.alternateContactCountryCode);
      }
      if (data.alternateContactNumber) {
        formData.append('alternateContactNumber', data.alternateContactNumber);
      }
      if (data.email) {
        formData.append('email', data.email);
      }

      // Pass deleted existing image IDs
      if (deletedImageIds.length > 0) {
        formData.append('deletedImageIds', JSON.stringify(deletedImageIds));
      }

      // Append new image files
      newImages.forEach((img) => {
        formData.append('images', img.file);
      });

      await api.updateCompany(company.id, formData);
      setSuccessMsg('Company updated successfully!');

      setTimeout(() => {
        handleClose();
        onSuccess();
      }, 900);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to update company. Please check input.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">Edit Company Details</h2>
              <p className="text-xs text-slate-500">
                Updating record for <strong className="text-slate-800">{company.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-sm text-emerald-700">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Row 1: Company Name & Contact Person */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Acme Innovations Corp"
                  className={`block w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  {...register('contactPerson')}
                  placeholder="e.g. Sarah Jenkins"
                  className={`block w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.contactPerson
                      ? 'border-red-300 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                />
              </div>
              {errors.contactPerson && (
                <p className="mt-1 text-xs text-red-600">{errors.contactPerson.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Contact Numbers with Country Code Selection & 10-digit validation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-xl shadow-xs overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <select
                  {...register('contactCountryCode')}
                  className="bg-slate-50 border-r border-slate-300 px-2.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {DEFAULT_COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  maxLength={10}
                  {...register('contactNumber')}
                  placeholder="10-digit number"
                  className="block w-full px-3 py-2.5 text-sm text-slate-900 focus:outline-none"
                />
              </div>
              {errors.contactNumber && (
                <p className="mt-1 text-xs text-red-600">{errors.contactNumber.message}</p>
              )}
            </div>

            {/* Alternate Contact Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alt. Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="flex rounded-xl shadow-xs overflow-hidden border border-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <select
                  {...register('alternateContactCountryCode')}
                  className="bg-slate-50 border-r border-slate-300 px-2.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {DEFAULT_COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  maxLength={10}
                  {...register('alternateContactNumber')}
                  placeholder="10-digit number"
                  className="block w-full px-3 py-2.5 text-sm text-slate-900 focus:outline-none"
                />
              </div>
              {errors.alternateContactNumber && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.alternateContactNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Email <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                {...register('email')}
                placeholder="contact@company.com"
                className={`block w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-400 focus:border-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Existing Photos Section with Delete/Undo */}
          {existingImages.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Current Photos ({existingImages.length})
                </label>
                <span className="text-[11px] text-slate-400">
                  Click trash icon to queue an image for removal
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {existingImages.map((img) => {
                  const isDeleted = deletedImageIds.includes(img.id);
                  return (
                    <div
                      key={img.id}
                      className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${
                        isDeleted
                          ? 'border-red-400 opacity-40 bg-red-50 ring-2 ring-red-400'
                          : 'border-slate-200 bg-slate-100 shadow-xs'
                      }`}
                    >
                      <img
                        src={formatImageUrl(img.url)}
                        alt="company photo"
                        className="w-full h-full object-cover"
                      />
                      {isDeleted ? (
                        <button
                          type="button"
                          onClick={() => unmarkImageForDeletion(img.id)}
                          className="absolute inset-0 bg-red-950/70 text-white flex flex-col items-center justify-center p-1 text-center cursor-pointer"
                          title="Undo deletion"
                        >
                          <Undo2 className="h-4 w-4 text-white mb-0.5" />
                          <span className="text-[10px] font-bold">Restore</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => markImageForDeletion(img.id)}
                          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                          title="Mark for deletion"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-white" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* New Image Upload Dropzone (Max 5 images total) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upload Additional Photos
              </label>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Total will be: {currentTotalImages} / {MAX_COMPANY_IMAGES} max photos
              </span>
            </div>

            {currentTotalImages < MAX_COMPANY_IMAGES ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-2xl p-5 text-center cursor-pointer transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <UploadCloud className="mx-auto h-7 w-7 text-slate-400 mb-1.5" />
                <p className="text-sm font-semibold text-slate-700">
                  Click or drag to attach more photos
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  You can add up to {MAX_COMPANY_IMAGES - currentTotalImages} more photo(s)
                </p>
              </div>
            ) : (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500 font-medium">
                Maximum 5 total images reached. Mark an existing photo above for removal to add new ones.
              </div>
            )}

            {fileError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center">
                <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                {fileError}
              </p>
            )}

            {/* New Images Previews */}
            {newImages.length > 0 && (
              <div className="mt-3">
                <span className="text-xs font-bold text-slate-600 block mb-1.5">
                  New Photos to be added ({newImages.length}):
                </span>
                <div className="grid grid-cols-5 gap-2.5">
                  {newImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden aspect-square border border-emerald-300 bg-slate-100 shadow-xs"
                    >
                      <img
                        src={img.previewUrl}
                        alt="new preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(idx)}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span>Updating Company...</span>
                </>
              ) : (
                <span>Update Company</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
