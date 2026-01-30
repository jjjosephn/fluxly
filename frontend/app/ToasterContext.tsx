// context/ToasterContext.tsx
'use client';

import React, { createContext, useRef, useContext } from 'react';
import Toaster, { ToasterRef } from '@/components/ui/toast';

type ToastVariant = 'default' | 'success' | 'error' | 'warning';
type ToastPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToasterContextType {
  showToast: (variant: ToastVariant, message?: string, position?: ToastPosition) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toasterRef = useRef<ToasterRef>(null);

  const showToast = (variant: ToastVariant, message = '', position: ToastPosition = 'bottom-right') => {
    toasterRef.current?.show({
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
      message: message || `This is a ${variant} toast notification.`,
      variant,
      position,
      duration: 3000,
    });
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <Toaster ref={toasterRef} />
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
