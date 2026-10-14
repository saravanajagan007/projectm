'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { CompanyImageDto } from '@projectm/shared';
import { formatImageUrl } from '../lib/utils';

interface CompanyGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  images: CompanyImageDto[];
  initialIndex?: number;
}

export function CompanyGalleryModal({
  isOpen,
  onClose,
  companyName,
  images,
  initialIndex = 0,
}: CompanyGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white">
          <div className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-emerald-400" />
            <h3 className="font-semibold text-lg">{companyName} Gallery</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main image viewer with Next / Prev */}
        <div className="relative flex-1 flex items-center justify-center p-4 min-h-[350px] max-h-[60vh] bg-black/50">
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10 cursor-pointer"
              title="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <img
            src={formatImageUrl(currentImage?.url)}
            alt={`${companyName} showcase ${currentIndex + 1}`}
            className="max-h-[55vh] max-w-full object-contain rounded-lg shadow-lg select-none"
          />

          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10 cursor-pointer"
              title="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Thumbnail Carousel strip */}
        {images.length > 1 && (
          <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 overflow-x-auto flex space-x-2">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 h-16 w-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-emerald-500 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={formatImageUrl(img.url)}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
