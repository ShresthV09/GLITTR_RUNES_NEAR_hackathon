// components/jobs/CreateJobForm.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateJobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    stakeBTC: '0.1',
    deadline: '',
    privateKey: '' // In production use a wallet connection
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/job/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userAddress: 'YOUR_ADDRESS' // In production get from wallet
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push(`/jobs/${data.job.id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error creating job: ${error.message}`);
      } else {
        alert('An unexpected error occurred while creating the job');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Technical Requirements</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          required
          rows={6}
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Stake Amount (BTC)</label>
        <input
          type="text"
          name="stakeBTC"
          value={formData.stakeBTC}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Private Key (dev only)</label>
        <input
          type="text"
          name="privateKey"
          value={formData.privateKey}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? 'Creating Job...' : 'Create Job'}
      </button>
    </form>
  );
}