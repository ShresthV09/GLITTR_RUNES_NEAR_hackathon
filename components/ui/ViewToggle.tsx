'use client';

import React from 'react';
import { ViewToggleProps } from '../../types/ui';

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, setActiveView }) => (
  <div className="flex rounded-lg overflow-hidden border border-gray-700">
    <button
      onClick={() => setActiveView('client')}
      className={`px-4 py-2 text-sm font-medium ${
        activeView === 'client'
          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      Client View
    </button>
    <button
      onClick={() => setActiveView('freelancer')}
      className={`px-4 py-2 text-sm font-medium ${
        activeView === 'freelancer'
          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      Freelancer View
    </button>
  </div>
);

export default ViewToggle;