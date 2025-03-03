'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { trustLockReducer, TrustLockAction } from './TrustLockReducer';
import { initialState, TrustLockState } from './initialState';
import { Job, JobOffer, Contract, PaymentPreferences } from '../types/escrow';

interface TrustLockContextType {
  state: TrustLockState;
  dispatch: React.Dispatch<TrustLockAction>;
  createJob: (job: Omit<Job, 'id' | 'client' | 'status' | 'aiScore' | 'files'>) => void;
  updateJob: (job: Partial<Job> & { id: string }) => void;
  deleteJob: (id: string) => void;
  acceptJobOffer: (id: string) => void;
  uploadFiles: (jobId: string, files: string[], userType: 'client' | 'freelancer') => void;
  submitForVerification: (jobId: string, notes?: string) => void;
  releaseFunds: (jobId: string) => void;
  createContract: (contract: Contract) => void;
  updateContract: (contract: Partial<Contract> & { id: string }) => void;
  deleteContract: (id: string) => void;
  updatePaymentPreferences: (prefs: Partial<PaymentPreferences>) => void;
  createJobOffer: (offer: Omit<JobOffer, 'id'>) => void;
  updateJobOffer: (offer: Partial<JobOffer> & { id: string }) => void;
  deleteJobOffer: (id: string) => void;
  switchView: (view: 'client' | 'freelancer') => void;
}

const TrustLockContext = createContext<TrustLockContextType | undefined>(undefined);

interface TrustLockProviderProps {
  children: ReactNode;
}

export const TrustLockProvider: React.FC<TrustLockProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(trustLockReducer, initialState);

  const createJob = (job: Omit<Job, 'id' | 'client' | 'status' | 'aiScore' | 'files'>) => {
    dispatch({ type: 'CREATE_JOB', payload: job });
  };

  const updateJob = (job: Partial<Job> & { id: string }) => {
    dispatch({ type: 'UPDATE_JOB', payload: job });
  };

  const deleteJob = (id: string) => {
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  const acceptJobOffer = (id: string) => {
    dispatch({ type: 'ACCEPT_JOB_OFFER', payload: id });
  };

  const uploadFiles = (jobId: string, files: string[], userType: 'client' | 'freelancer') => {
    dispatch({ type: 'UPLOAD_FILES', payload: { jobId, files, userType } });
  };

  const submitForVerification = (jobId: string, notes?: string) => {
    dispatch({ type: 'SUBMIT_FOR_VERIFICATION', payload: { jobToVerify: jobId, notes } });
  };

  const releaseFunds = (jobId: string) => {
    dispatch({ type: 'RELEASE_FUNDS', payload: jobId });
  };

  const createContract = (contract: Contract) => {
    dispatch({ type: 'CREATE_CONTRACT', payload: contract });
  };

  const updateContract = (contract: Partial<Contract> & { id: string }) => {
    dispatch({ type: 'UPDATE_CONTRACT', payload: contract });
  };

  const deleteContract = (id: string) => {
    dispatch({ type: 'DELETE_CONTRACT', payload: id });
  };

  const updatePaymentPreferences = (prefs: Partial<PaymentPreferences>) => {
    dispatch({ type: 'UPDATE_PAYMENT_PREFERENCES', payload: prefs });
  };

  const createJobOffer = (offer: Omit<JobOffer, 'id'>) => {
    dispatch({ type: 'CREATE_JOB_OFFER', payload: offer });
  };

  const updateJobOffer = (offer: Partial<JobOffer> & { id: string }) => {
    dispatch({ type: 'UPDATE_JOB_OFFER', payload: offer });
  };

  const deleteJobOffer = (id: string) => {
    dispatch({ type: 'DELETE_JOB_OFFER', payload: id });
  };

  const switchView = (view: 'client' | 'freelancer') => {
    dispatch({ type: 'SWITCH_VIEW', payload: view });
  };

  const value = {
    state,
    dispatch,
    createJob,
    updateJob,
    deleteJob,
    acceptJobOffer,
    uploadFiles,
    submitForVerification,
    releaseFunds,
    createContract,
    updateContract,
    deleteContract,
    updatePaymentPreferences,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    switchView,
  };

  return (
    <TrustLockContext.Provider value={value}>
      {children}
    </TrustLockContext.Provider>
  );
};

export const useTrustLock = (): TrustLockContextType => {
  const context = useContext(TrustLockContext);
  if (context === undefined) {
    throw new Error('useTrustLock must be used within a TrustLockProvider');
  }
  return context;
};