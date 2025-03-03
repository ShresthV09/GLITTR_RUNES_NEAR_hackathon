'use client'
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Code, 
  ExternalLink, 
  FileText, 
  Lock, 
  ArrowUpDown, 
  Shield, 
  AlertTriangle, 
  Settings, 
  Upload, 
  RefreshCw, 
  AlertCircle, 
  Layers,
  BarChart2,
  Eye,
  DollarSign
} from 'lucide-react';

import { GlittrSDK, Account, txBuilder } from "@glittr-sdk/sdk";
import Navbar from '@/components/dashboard/Navbar';

// Define interfaces for component props
interface NavLinkProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

interface ViewToggleProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

interface BalanceChipProps {
  type: string;
  amount: string | number;
}

interface EscrowItemProps {
  title: string;
  amount: number;
  freelancer?: string;
  client?: string;
  daysLeft: number;
  status: string;
  aiScore: number | null;
  userType?: string;
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

interface JobOfferItemProps {
  title: string;
  amount: number;
  client: string;
  duration: number;
  required: number;
  skills: string[];
}

const TrustLockPlatform = () => {
 
  const [activeView, setActiveView] = useState('client');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
   <Navbar/>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Page Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">
              AI-Powered Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Escrow</span>
            </h1>
            <ViewToggle activeView={activeView} setActiveView={setActiveView} />
          </div>
          <p className="text-gray-400 mt-2">
            Trustless escrow with AI verification and instant swap payments
          </p>
        </div>
        
        {activeView === 'client' ? <ClientDashboard /> : <FreelancerDashboard />}
      </main>
    </div>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ children, active, onClick }) => (
  <a 
    href="#"
    onClick={onClick}
    className={`px-1 py-2 border-b-2 font-medium ${
      active 
        ? 'border-blue-400 text-blue-400' 
        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
    } transition-colors duration-200`}
  >
    {children}
  </a>
);

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



// Client Dashboard
const ClientDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <JobPostingCard />
      <ContractCreationCard />
      <TrustLockProcessCard />
      <ActiveEscrowsCard />
    </div>
    <div className="space-y-6">
      <AIVerificationWidget />
      <SwapWidget />
      <DisputeCard />
    </div>
  </div>
);

// Freelancer Dashboard
const FreelancerDashboard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <JobOfferCard />
      <CodeSubmissionCard />
      <ActiveEscrowsCard userType="freelancer" />
    </div>
    <div className="space-y-6">
      <AIFeedbackWidget />
      <PaymentPreferenceWidget />
      <CommitmentCard />
    </div>
  </div>
);

// Shared Cards
const ActiveEscrowsCard = ({ userType = 'client' }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Lock className="text-blue-400 mr-2" size={20} />
        Active Escrows
      </h2>
    </div>
    <div className="divide-y divide-gray-700">
      {userType === 'client' ? (
        <>
          <EscrowItem 
            title="Marketplace API Integration"
            amount={0.1}
            freelancer="alex.near"
            daysLeft={18}
            status="In Progress"
            aiScore={null}
            client=""
          />
          <EscrowItem 
            title="Smart Contract Audit"
            amount={0.05}
            freelancer="smartdev.near"
            daysLeft={7}
            status="Submitted"
            aiScore={78}
            client=""
          />
          <EscrowItem 
            title="Web3 Login Component"
            amount={0.03}
            freelancer="frontend.near"
            daysLeft={2}
            status="AI Verified"
            aiScore={92}
            client=""
          />
        </>
      ) : (
        <>
          <EscrowItem 
            title="NFT Marketplace Backend"
            amount={0.12}
            client="cryptocorp.near"
            daysLeft={21}
            status="In Progress"
            aiScore={null}
            freelancer=""
            userType="freelancer"
          />
          <EscrowItem 
            title="DeFi Dashboard Widgets"
            amount={0.04}
            client="defiproject.near"
            daysLeft={5}
            status="Submitted"
            aiScore={81}
            freelancer=""
            userType="freelancer"
          />
        </>
      )}
    </div>
  </div>
);

const EscrowItem: React.FC<EscrowItemProps> = ({ title, amount, freelancer, client, daysLeft, status, aiScore, userType = 'client' }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'In Progress': return 'bg-yellow-500';
      case 'Submitted': return 'bg-blue-500';
      case 'AI Verified': return 'bg-green-500';
      case 'Disputed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="p-4 hover:bg-gray-700/30 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
            <span className="text-sm font-medium">{amount} BTC</span>
          </div>
          <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()} text-white font-medium`}>
            {status}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <div>{userType === 'client' ? `Freelancer: ${freelancer}` : `Client: ${client}`}</div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {daysLeft} days left
        </div>
      </div>
      {status === 'Submitted' || status === 'AI Verified' ? (
        <div className="mt-2 flex items-center">
          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${aiScore && aiScore >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
              style={{ width: `${aiScore || 0}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium">{aiScore || 0}%</span>
        </div>
      ) : null}
    </div>
  );
};

// Client-specific Cards
const JobPostingCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold">Post a New Job</h2>
    </div>
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g. Smart Contract Development" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Requirements</label>
        <textarea 
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-20"
          placeholder="Detailed requirements for AI verification..." 
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Escrow Amount (BTC)</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.1" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Deadline (Days)</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="30" 
          />
        </div>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="use-near" className="mr-2" />
            <label htmlFor="use-near" className="text-sm">Fund with NEAR instead of BTC</label>
          </div>
          <div className="text-xs text-gray-500">Auto-swap will be applied</div>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors">
          Create & Fund Escrow
        </button>
      </div>
    </div>
  </div>
);

const TrustLockProcessCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Shield className="text-blue-400 mr-2" size={20} />
        How TrustLock Works
      </h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="relative">
        <div className="absolute left-4 w-0.5 h-full bg-gray-700"></div>
        
        <ProcessStep 
          number={1}
          title="Job Posting & Escrow Funding"
          description="You stake BTC (30-day timelock) into TrustLock's smart contract. Freelancer accepts & stakes 50% of your amount."
          icon={<Lock size={20} />}
        />
        
        <ProcessStep 
          number={2}
          title="Code Submission & AI Verification"
          description="Freelancer uploads code to TrustLock. Claude AI verifies against your requirements.txt using real-time analysis."
          icon={<Code size={20} />}
        />
        
        <ProcessStep 
          number={3}
          title="Automatic Payment Release"
          description="If AI score ≥ 80%, contract auto-releases BTC. Freelancer can receive in BTC or auto-swap to NEAR."
          icon={<Check size={20} />}
        />
        
        <ProcessStep 
          number={4}
          title="Dispute Resolution (No DAOs)"
          description="Missed deadline? 30% of freelancer's stake is slashed. Low quality code (<60%)? Full refund to you."
          icon={<AlertCircle size={20} />}
          isLast
        />
      </div>
    </div>
  </div>
);

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

const DisputeCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700 flex justify-between items-center">
      <h2 className="text-xl font-bold flex items-center">
        <AlertTriangle className="text-yellow-400 mr-2" size={20} />
        Automated Dispute Resolution
      </h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="space-y-3">
        <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
          <h3 className="font-medium flex items-center text-red-400">
            <AlertCircle size={16} className="mr-2" />
            Missed Deadline
          </h3>
          <p className="text-sm mt-1">Smart contract automatically slashes 30% of freelancer's stake. You receive compensation instantly.</p>
        </div>
        
        <div className="p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
          <h3 className="font-medium flex items-center text-yellow-400">
            <AlertCircle size={16} className="mr-2" />
            Low Quality Code
          </h3>
          <p className="text-sm mt-1">If AI verification score is &lt;60%, the entire stake is slashed, and you are fully refunded.</p>
        </div>
        
        <div className="p-3 bg-gray-700 rounded-lg">
          <h3 className="font-medium">No Manual Intervention</h3>
          <p className="text-sm text-gray-400 mt-1">Everything is automated via smart contracts. No need for DAO votes or manual reviews.</p>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-gray-400">Current Escrow Security:</span>
          <span className="flex items-center text-green-400">
            <Shield size={14} className="mr-1" />
            All funds secured by smart contracts
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Freelancer-specific Cards
const JobOfferCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold">Available Job Offers</h2>
    </div>
    <div className="divide-y divide-gray-700">
      <JobOfferItem 
        title="Cross-Chain Bridge Integration"
        amount={0.15}
        client="chainlink.near"
        duration={30}
        required={0.075}
        skills={["Rust", "NEAR SDK", "Cross-chain"]}
      />
      <JobOfferItem 
        title="NFT Marketplace Backend"
        amount={0.08}
        client="nftcreator.near"
        duration={21}
        required={0.04}
        skills={["Node.js", "Smart Contracts", "Storage"]}
      />
      <JobOfferItem 
        title="DeFi Analytics Dashboard"
        amount={0.06}
        client="defiprotocol.near"
        duration={14}
        required={0.03}
        skills={["React", "Data Visualization", "Web3"]}
      />
    </div>
  </div>
);

const JobOfferItem: React.FC<JobOfferItemProps> = ({ title, amount, client, duration, required, skills }) => (
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
      {skills.map((skill: string, index: number) => (
        <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded-full">
          {skill}
        </span>
      ))}
    </div>
    <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg text-sm font-medium transition-colors">
      Accept & Stake {required} BTC
    </button>
  </div>
);

const CodeSubmissionCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Code className="text-blue-400 mr-2" size={20} />
        Submit Code for AI Verification
      </h2>
    </div>
    <div className="p-4 md:p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Select Escrow</label>
        <select className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>NFT Marketplace Backend (0.12 BTC)</option>
          <option>DeFi Dashboard Widgets (0.04 BTC)</option>
        </select>
      </div>
      
      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
        <Upload className="mx-auto text-gray-500 mb-2" size={32} />
        <p className="text-gray-400 mb-2">Drag code files or click to upload</p>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
          Select Files
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Implementation Notes (Optional)</label>
        <textarea 
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-16"
          placeholder="Additional context about your implementation..." 
        ></textarea>
      </div>
      
      <div className="flex items-center justify-between text-sm mb-2">
        <div className="flex items-center text-gray-400">
          <FileText size={14} className="mr-1" />
          requirements.txt
          <a href="#" className="ml-2 text-blue-400 hover:underline flex items-center">
            View <Eye size={12} className="ml-1" />
          </a>
        </div>
        <div className="text-yellow-400 flex items-center">
          <AlertTriangle size={14} className="mr-1" />
          AI will verify against these requirements
        </div>
      </div>
      
      <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors flex items-center justify-center">
        <Code size={18} className="mr-2" />
        Submit for AI Verification
      </button>
    </div>
  </div>
);

const CommitmentCard = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Lock className="text-blue-400 mr-2" size={20} />
        Commitment Stakes
      </h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Total Staked</span>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
              <span>0.16 BTC</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">Across 2 active projects</div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Stake Allocation</h3>
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="bg-blue-500" style={{ width: '75%' }}></div>
              <div className="bg-green-500" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
              <span>At risk (0.12 BTC)</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span>Completed (0.04 BTC)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
          <h3 className="font-medium flex items-center text-blue-400">
            <Shield size={16} className="mr-2" />
            Stake Protection
          </h3>
          <div className="flex justify-between text-sm mt-1">
            <span>Volatility Hedge</span>
            <span>Active</span>
          </div>
          <div className="text-xs text-gray-400">Auto-converts to NEAR if BTC drops 5%+</div>
        </div>
        
        <div className="text-center pt-2">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors flex items-center mx-auto">
            <Settings size={14} className="mr-1" />
            Manage Stake Settings
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Shared Widgets
const SwapWidget = () => {
  const [swapDirection, setSwapDirection] = useState('btcToNear');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <ArrowUpDown className="text-blue-400 mr-2" size={20} />
          Swap-Driven Payments
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">From</span>
            <div className="text-xs text-gray-500">Balance: {swapDirection === 'btcToNear' ? '0.42 BTC' : '128.5 NEAR'}</div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input 
              type="text" 
              className="bg-transparent w-1/2 text-xl font-medium outline-none"
              value={swapDirection === 'btcToNear' ? '0.05' : '1500'} 
              readOnly
            />
            <div className="flex items-center bg-gray-700 px-3 py-1.5 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${swapDirection === 'btcToNear' ? 'bg-yellow-400' : 'bg-green-400'} mr-1.5`}></div>
              <span>{swapDirection === 'btcToNear' ? 'BTC' : 'NEAR'}</span>
            </div>
          </div>
          
          <div className="flex justify-center my-2">
            <button 
              onClick={() => setSwapDirection(swapDirection === 'btcToNear' ? 'nearToBtc' : 'btcToNear')}
              className="bg-gray-700 p-1.5 rounded-full hover:bg-gray-600 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">To</span>
            <div className="text-xs text-gray-500">Estimated value</div>
          </div>
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              className="bg-transparent w-1/2 text-xl font-medium outline-none"
              value={swapDirection === 'btcToNear' ? '1500' : '0.05'} 
              readOnly
            />
            <div className="flex items-center bg-gray-700 px-3 py-1.5 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${swapDirection === 'btcToNear' ? 'bg-green-400' : 'bg-yellow-400'} mr-1.5`}></div>
              <span>{swapDirection === 'btcToNear' ? 'NEAR' : 'BTC'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Exchange Rate</span>
            <span>{swapDirection === 'btcToNear' ? '1 BTC = 30,000 NEAR' : '1 NEAR = 0.000033 BTC'}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Swap Fee</span>
            <span className="text-green-400">0.5% (via Runes DEX)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Time</span>
            <span>~30 seconds</span>
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors">
          Swap Now
        </button>
        
        <div className="pt-2">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Fund Escrow in NEAR
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Cash Out to BTC
            </button>
            <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors">
              Enable Auto-Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIVerificationWidget = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <Layers className="text-blue-400 mr-2" size={20} />
        AI Verification Status
      </h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="relative">
        <div className="w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold">92%</div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#374151" 
              strokeWidth="10" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="10" 
              strokeDasharray="251.2" 
              strokeDashoffset="20"
              transform="rotate(-90 50 50)" 
            />
          </svg>
        </div>
        
        <div className="text-center mb-4">
          <div className="font-medium">Web3 Login Component</div>
          <div className="text-sm text-gray-400">Verification complete</div>
        </div>
        
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 mb-4">
          <h3 className="font-medium flex items-center text-green-400">
            <Check size={16} className="mr-2" />
            AI Verification Passed
          </h3>
          <p className="text-sm mt-1">Code matches requirements with 92% accuracy. Funds are ready to be released.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xl font-medium text-green-400">8/8</div>
            <div className="text-xs text-gray-400">Tests Passed</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xl font-medium">0</div>
            <div className="text-xs text-gray-400">Vulnerabilities</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xl font-medium">98%</div>
            <div className="text-xs text-gray-400">Code Coverage</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-xl font-medium text-blue-400">A+</div>
            <div className="text-xs text-gray-400">Code Quality</div>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="w-full py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center justify-center">
            <Check size={18} className="mr-2" />
            Release Funds to Freelancer
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AIFeedbackWidget = () => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-700">
      <h2 className="text-xl font-bold flex items-center">
        <BarChart2 className="text-blue-400 mr-2" size={20} />
        AI Feedback
      </h2>
    </div>
    <div className="p-4 md:p-6">
      <div className="relative">
        <div className="w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold">78%</div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#374151" 
              strokeWidth="10" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#FBBF24" 
              strokeWidth="10" 
              strokeDasharray="251.2" 
              strokeDashoffset="55"
              transform="rotate(-90 50 50)" 
            />
          </svg>
        </div>
        
        <div className="text-center mb-4">
          <div className="font-medium">DeFi Dashboard Widgets</div>
          <div className="text-sm text-gray-400">Almost there!</div>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4">
          <h3 className="font-medium flex items-center text-yellow-400">
            <AlertCircle size={16} className="mr-2" />
            Almost passing (threshold: 80%)
          </h3>
          <p className="text-sm mt-1">2 issues need to be fixed before funds can be released.</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1">Missing Error Handling</h4>
            <p className="text-xs text-gray-400">Add try/catch blocks around API calls in the price feed component.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1">Performance Issue</h4>
            <p className="text-xs text-gray-400">Chart rendering needs optimization for large datasets.</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            View Full Report
          </button>
          <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors">
            Fix & Resubmit
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PaymentPreferenceWidget = () => {
  const [paymentMethod, setPaymentMethod] = useState('auto-swap');
  const [isAutoHedgingEnabled, setIsAutoHedgingEnabled] = useState(true);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <DollarSign className="text-blue-400 mr-2" size={20} />
          Payment Preferences
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Payment Method</label>
          <div className="space-y-2">
            <div className="flex items-center p-3 bg-gray-700 rounded-lg border border-blue-500">
              <input 
                type="radio" 
                name="payment-method" 
                value="auto-swap"
                checked={paymentMethod === 'auto-swap'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3" 
              />
              <div>
                <div className="font-medium">Auto-swap to NEAR</div>
                <div className="text-xs text-gray-400">Instantly convert BTC payments to NEAR</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <input 
                type="radio" 
                name="payment-method" 
                value="btc"
                checked={paymentMethod === 'btc'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3" 
              />
              <div>
                <div className="font-medium">Keep as BTC</div>
                <div className="text-xs text-gray-400">Receive payments directly in Bitcoin</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700 rounded-lg">
              <input 
                type="radio" 
                name="payment-method" 
                value="split"
                checked={paymentMethod === 'split'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3" 
              />
              <div>
                <div className="font-medium">Split Payment</div>
                <div className="text-xs text-gray-400">50% BTC, 50% NEAR</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Auto-Hedging (Optional)</label>
          <div className="p-3 bg-gray-700 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-medium">Volatility Protection</div>
              <div className="text-xs text-gray-400">Auto-swap to stablecoins if BTC drops 5%+</div>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                id="toggle"
                checked={isAutoHedgingEnabled}
                onChange={(e) => setIsAutoHedgingEnabled(e.target.checked)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isAutoHedgingEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-lg font-medium transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

// Add ContractCreationCard component
const ContractCreationCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createContract = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const NETWORK = "regtest";
      const client = new GlittrSDK({
        network: NETWORK,
        electrumApi: "http://127.0.0.1:24224/",
    glittrApi: "http://127.0.0.1:3001",
        apiKey: "3f799dfe-fb41-4847-a334-c416a703ad31",
      });
      console.log("client : ", client); 

    
const account = new Account({
    privateKey: "71f6379c1a9758a6fe46b031f8342717cf7592342fd574ed2d3a148e949f8a0d",
    network: NETWORK
})

console.log("p2pkh : ",account.p2pkh())
console.log("p2wpkh : ",account.p2wpkh())
    
      setSuccess(`Contract created successfullyx`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <Code className="text-blue-400 mr-2" size={20} />
          Create Contract
        </h2>
      </div>
      <div className="p-4 md:p-6 space-y-4">
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 text-red-200 flex items-start">
            <AlertCircle className="shrink-0 mr-2 mt-0.5" size={16} />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-900/50 border border-green-700 rounded-lg p-3 text-green-200 flex items-start">
            <Check className="shrink-0 mr-2 mt-0.5" size={16} />
            <p>{success}</p>
          </div>
        )}
        <button
          onClick={createContract}
          disabled={loading}
          className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <RefreshCw className="animate-spin" size={16} />
              <span>Creating Contract...</span>
            </>
          ) : (
            <>
              <Code size={16} />
              <span>Create Contract</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrustLockPlatform;





