'use client';

import React from 'react';
import { TrustLockProvider } from '@/context/TrustLockContext';
import TrustLockPlatform from '@/components/dashboard/TrustLockPlatform';

export default function Home() {
  return (
    <TrustLockProvider>
      <TrustLockPlatform />
    </TrustLockProvider>
  );
}