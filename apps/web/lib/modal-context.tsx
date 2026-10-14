'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { AddCompanyModal } from '../components/AddCompanyModal';

interface ModalContextType {
  openAddCompany: () => void;
  closeAddCompany: () => void;
  registerOnSuccess: (cb: () => void) => () => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Store listeners in a ref so registering listeners does NOT trigger state updates or re-renders
  const callbacksRef = useRef<Set<() => void>>(new Set());

  const openAddCompany = useCallback(() => setIsAddOpen(true), []);
  const closeAddCompany = useCallback(() => setIsAddOpen(false), []);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const registerOnSuccess = useCallback((cb: () => void) => {
    callbacksRef.current.add(cb);
    return () => {
      callbacksRef.current.delete(cb);
    };
  }, []);

  const handleSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    callbacksRef.current.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Error executing on-success callback:', err);
      }
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      openAddCompany,
      closeAddCompany,
      registerOnSuccess,
      refreshTrigger,
      triggerRefresh,
    }),
    [openAddCompany, closeAddCompany, registerOnSuccess, refreshTrigger, triggerRefresh],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <AddCompanyModal
        isOpen={isAddOpen}
        onClose={closeAddCompany}
        onSuccess={handleSuccess}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
