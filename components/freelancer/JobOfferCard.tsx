

'use client';

import React from 'react';
import { useTrustLock } from '../../context/TrustLockContext';
import JobOfferItem from './JobOfferItem';

const JobOfferCard: React.FC = () => {
  const { state, dispatch } = useTrustLock();
  const { jobOffers } = state;
  
  const handleAcceptOffer = (offerId: string) => {
    if (window.confirm('Are you sure you want to accept this job and stake the required amount?')) {
      dispatch({ type: 'ACCEPT_JOB_OFFER', payload: offerId });
    }
  };
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Available Job Offers</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {jobOffers.length > 0 ? (
          jobOffers.map((offer) => (
            <JobOfferItem 
              key={offer.id}
              id={offer.id}
              title={offer.title}
              amount={offer.amount}
              client={offer.client}
              duration={offer.duration}
              required={offer.required}
              skills={offer.skills}
              onAccept={() => handleAcceptOffer(offer.id)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-400">
            No job offers available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOfferCard;