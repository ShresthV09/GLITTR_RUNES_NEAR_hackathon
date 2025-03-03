// components/ui/Modal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md' 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-6xl',
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={`${sizeClasses[size]} w-full bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;