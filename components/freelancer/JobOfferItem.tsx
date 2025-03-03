
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { JobOfferItemProps } from '../../types/ui';

const JobOfferItem: React.FC<JobOfferItemProps> = ({ 
  id, 
  title, 
  amount, 
  client, 
  duration, 
  required, 
  skills, 
  onAccept 
}) => {
  return (
    <div className="p-4 hover:bg-gray-700/30 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
          <span className="text-sm font-medium">{amount} BTC</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-3">
        <div>Client: {client}</div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {duration} days
        </div>
        <div>Required stake: {required} BTC</div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill, index) => (
          <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      <button 
        onClick={onAccept}
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg text-sm font-medium transition-colors"
      >
        Accept & Stake {required} BTC
      </button>
    </div>
  );
};

export default JobOfferItem;