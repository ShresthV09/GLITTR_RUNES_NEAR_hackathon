import React from 'react';
import { ProcessStepProps } from '../../types/ui';

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, icon, isLast = false }) => (
  <div className={`relative ml-10 ${isLast ? '' : 'mb-8'}`}>
    <div className="absolute left-[-42px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
      {number}
    </div>
    <div>
      <h3 className="text-lg font-medium flex items-center">
        <span className="mr-2">{title}</span>
        <span className="text-blue-400">{icon}</span>
      </h3>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  </div>
);

export default ProcessStep;