'use client';

import React, { useState } from 'react';
import { 
  Activity,
  BarChart2,
  Briefcase,
  ChevronDown, 
  ChevronRight,
  Clock, 
  Database, 
  DollarSign,
  ExternalLink,
  Eye,
  FileText, 
  Filter,
  Grid, 
  Info,
  Lock, 
  Menu,
  Moon, 
  MoreHorizontal,
  PieChart, 
  Plus,
  Repeat,
  Search,
  Settings, 
  Shield, 
  Star,
  Sun, 
  TrendingUp,
  Wallet,
  Zap
} from 'lucide-react';

const PremiumRunesDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#0F172A] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Navigation Bar */}
      <header className={`px-4 py-3 flex items-center justify-between border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <button className="p-1 mr-4 lg:hidden">
            <Menu size={20} />
          </button>
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600 mr-2">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">RunesDEX</span>
          </div>
          <div className="hidden md:flex ml-8 relative">
            <div className={`flex items-center w-64 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'}`}>
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search pools, tokens..."
                className={`bg-transparent outline-none w-full text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className={`hidden md:flex rounded-lg px-3 py-1.5 text-sm font-medium ${darkMode ? 'bg-gray-800/70' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Block: 878,432</span>
              <span className="text-gray-500">|</span>
              <Clock size={14} className="text-gray-400" />
              <span>6 sats/vB</span>
            </div>
          </div>
          
          <button className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-600">
              <span className="text-xs font-bold text-white">₿</span>
            </div>
            <span>3.54 BTC</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          
          <button className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600">
            <Wallet size={18} className="text-white" />
          </button>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center h-9 w-9 rounded-lg ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 shadow-sm'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className={`flex items-center justify-center h-9 w-9 rounded-lg ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
            <Settings size={18} />
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className={`w-64 border-r hidden lg:block ${darkMode ? 'border-gray-800 bg-[#0F172A]/90' : 'border-gray-200 bg-white'}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 flex-1">
              <nav className="space-y-1 mb-8">
                <NavLink
                  icon={Grid}
                  label="Dashboard"
                  active={activeTab === 'dashboard'}
                  onClick={() => setActiveTab('dashboard')}
                  darkMode={darkMode}
                />
                <NavLink
                  icon={Zap}
                  label="Yield Farms"
                  active={activeTab === 'farms'}
                  onClick={() => setActiveTab('farms')}
                  darkMode={darkMode}
                />
                <NavLink
                  icon={Repeat}
                  label="Swap"
                  active={activeTab === 'swap'}
                  onClick={() => setActiveTab('swap')}
                  darkMode={darkMode}
                />
                <NavLink
                  icon={PieChart}
                  label="Liquidity Pools"
                  active={activeTab === 'pools'}
                  onClick={() => setActiveTab('pools')}
                  darkMode={darkMode}
                />
                <NavLink
                  icon={Briefcase}
                  label="Portfolio"
                  active={activeTab === 'portfolio'}
                  onClick={() => setActiveTab('portfolio')}
                  darkMode={darkMode}
                />
                <NavLink
                  icon={BarChart2}
                  label="Analytics"
                  active={activeTab === 'analytics'}
                  onClick={() => setActiveTab('analytics')}
                  darkMode={darkMode}
                />
              </nav>
              
              <div className="mb-6">
                <h3 className={`text-xs font-medium mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>TOP RUNES</h3>
                <div className="space-y-1">
                  <TokenItem
                    symbol="RCAT"
                    name="Runes Cat"
                    price="$0.095"
                    change="+18.4%"
                    positive={true}
                    darkMode={darkMode}
                  />
                  <TokenItem
                    symbol="RPEPE"
                    name="RunePepe"
                    price="$0.042"
                    change="+9.2%"
                    positive={true}
                    darkMode={darkMode}
                  />
                  <TokenItem
                    symbol="RSATS"
                    name="RuneSats"
                    price="$0.018"
                    change="-2.3%"
                    positive={false}
                    darkMode={darkMode}
                  />
                  <TokenItem
                    symbol="RDOGE"
                    name="RuneDoge"
                    price="$0.015"
                    change="-4.7%"
                    positive={false}
                    darkMode={darkMode}
                  />
                </div>
              </div>
              
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50' : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'}`}>
                <h4 className="font-medium text-sm flex items-center mb-3">
                  <Shield size={14} className="mr-1.5 text-orange-500" />
                  <span>Network Health</span>
                </h4>
                <div className="space-y-2">
                  <HealthItem
                    label="Bitcoin Network"
                    value="Healthy"
                    status="good"
                    darkMode={darkMode}
                  />
                  <HealthItem
                    label="Mempool"
                    value="Normal"
                    status="good"
                    darkMode={darkMode}
                  />
                  <HealthItem
                    label="Runes Protocol"
                    value="Optimal"
                    status="good"
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
            
            <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <button className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium flex items-center justify-center">
                <Plus size={16} className="mr-1.5" />
                New Position
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <DashboardContent darkMode={darkMode} />
          </div>
        </main>
      </div>
    </div>
  );
};

// Navigation Link
interface NavLinkProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}

const NavLink = ({ icon: Icon, label, active, onClick, darkMode }: NavLinkProps) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? `bg-gradient-to-r ${darkMode ? 'from-yellow-500/10 to-orange-500/10' : 'from-yellow-50 to-orange-50'} text-orange-500` 
        : `${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`
    }`}
  >
    <Icon size={18} className={`mr-3 ${active ? 'text-orange-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
    {label}
  </button>
);

// Token List Item
interface TokenItemProps {
  symbol: string;
  name: string;
  price: string | number;
  change: string | number;
  positive: boolean;
  darkMode: boolean;
}

const TokenItem = ({ symbol, name, price, change, positive, darkMode }: TokenItemProps) => (
  <div className={`flex items-center justify-between p-2 rounded-lg hover:cursor-pointer ${darkMode ? 'hover:bg-gray-800/70' : 'hover:bg-gray-100'}`}>
    <div className="flex items-center">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 mr-2.5 text-xs font-bold">
        {symbol.substring(0, 1)}
      </div>
      <div>
        <div className="font-medium text-sm">{symbol}</div>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{name}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm font-medium">{price}</div>
      <div className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  </div>
);

// Health Status Item
interface HealthItemProps {
  label: string;
  value: string | number;
  status: 'good' | 'warning' | 'danger';
  darkMode: boolean;
}

const HealthItem = ({ label, value, status, darkMode }: HealthItemProps) => (
  <div className="flex items-center justify-between">
    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    <span className={`text-xs font-medium ${
      status === 'good' ? 'text-green-500' : 
      status === 'warning' ? 'text-yellow-500' : 
      'text-red-500'
    }`}>
      {value}
    </span>
  </div>
);

// Dashboard Content
interface DashboardContentProps {
  darkMode: boolean;
}

const DashboardContent = ({ darkMode }: DashboardContentProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Runes DEX Dashboard</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Overview of your positions and market activity
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
            <Eye size={16} className="mr-1.5 text-gray-400" />
            <span>Watchlist</span>
          </button>
          <button className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
            <Filter size={16} className="mr-1.5 text-gray-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={<Database size={18} className="text-blue-500" />}
          title="Total Value Locked"
          value="$89.43M"
          change="+12.4%"
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<Zap size={18} className="text-orange-500" />}
          title="Your Positions"
          value="$34,275"
          change="+0.8%"
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<DollarSign size={18} className="text-green-500" />}
          title="Unclaimed Rewards"
          value="$1,843"
          change="4 days left"
          positive={null}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<Activity size={18} className="text-purple-500" />}
          title="24h Volume"
          value="$12.6M"
          change="+32.8%"
          positive={true}
          darkMode={darkMode}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card darkMode={darkMode}>
            <CardHeader title="Your Active Positions" darkMode={darkMode}>
              <div className="flex space-x-2">
                <button className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  Farms
                </button>
                <button className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-orange-500/10 text-orange-500' : 'bg-orange-50 text-orange-500'}`}>
                  All
                </button>
              </div>
            </CardHeader>
            <div className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
              <PositionItem
                pairIcons={['R', '₿']}
                pairName="RCAT/BTC"
                pairColors={['bg-orange-500', 'bg-yellow-400']}
                tvl="$42.65M"
                apr="86.4%"
                staked="$21,450"
                rewards="$843"
                darkMode={darkMode}
              />
              <PositionItem
                pairIcons={['R', '$']}
                pairName="RPEPE/USDT"
                pairColors={['bg-green-500', 'bg-blue-500']}
                tvl="$12.32M"
                apr="124.2%"
                staked="$8,375"
                rewards="$624"
                darkMode={darkMode}
              />
              <PositionItem
                pairIcons={['R', '₿']}
                pairName="RSATS/BTC"
                pairColors={['bg-blue-500', 'bg-yellow-400']}
                tvl="$18.75M"
                apr="46.8%"
                staked="$4,450"
                rewards="$376"
                darkMode={darkMode}
              />
            </div>
          </Card>
        </div>
        
        <div>
          <Card darkMode={darkMode}>
            <CardHeader title="Bitcoin Mempool" darkMode={darkMode}>
              <button className={`flex items-center text-xs ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                <ExternalLink size={14} className="ml-1" />
              </button>
            </CardHeader>
            <div className="p-4">
              <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Status</span>
                  <span className="text-sm font-medium text-green-500">Normal</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending Transactions</span>
                  <span className="text-sm">4,382</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next Block ETA</span>
                  <span className="text-sm">~4 minutes</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Fee Priority</span>
                  <span className="text-sm font-medium text-orange-500">6 sats/vByte</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Low Priority</span>
                  <span>High Priority</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${darkMode ? 'bg-orange-500/5 border-orange-500/20' : 'bg-orange-50 border-orange-100'} mb-4`}>
                <div className="flex">
                  <div className="mr-3 text-orange-500 mt-0.5">
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-500">UTXO Optimization Available</h4>
                    <p className="text-xs mt-1 text-orange-500/80">
                      Consolidating your UTXOs could save you 32% on transaction fees.
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg text-sm font-medium">
                Optimize Now
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card darkMode={darkMode}>
          <CardHeader title="Yield Opportunities" darkMode={darkMode}>
            <button className={`text-xs font-medium text-orange-500`}>
              View All
            </button>
          </CardHeader>
          <div className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
            <YieldItem
              pairIcons={['R', '$']}
              pairName="RMOON/USDC"
              pairColors={['bg-purple-500', 'bg-blue-400']}
              apr="218.7%"
              tvl="$5.48M"
              warning="High Risk"
              darkMode={darkMode}
            />
            <YieldItem
              pairIcons={['R', '$']}
              pairName="RPEPE/USDT"
              pairColors={['bg-green-500', 'bg-blue-500']}
              apr="124.2%"
              tvl="$12.32M"
              warning={null}
              darkMode={darkMode}
            />
            <YieldItem
              pairIcons={['R', '₿']}
              pairName="RCAT/BTC"
              pairColors={['bg-orange-500', 'bg-yellow-400']}
              apr="86.4%"
              tvl="$42.65M"
              warning={null}
              darkMode={darkMode}
            />
          </div>
        </Card>
        
        <Card darkMode={darkMode}>
          <CardHeader title="Yield Simulator" darkMode={darkMode}>
            <div className="flex items-center">
              <Zap size={14} className="text-orange-500 mr-1" />
              <span className="text-xs font-medium text-orange-500">Auto-Compound</span>
            </div>
          </CardHeader>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Amount to Stake
                </label>
                <div className={`flex items-center px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <input 
                    type="text" 
                    className={`bg-transparent outline-none flex-1 ${darkMode ? 'text-white' : 'text-black'}`}
                    defaultValue="0.5"
                  />
                  <div className="flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 mr-1.5">
                      <span className="text-xs font-bold text-white">₿</span>
                    </div>
                    <span className="text-sm font-medium">BTC</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Farm Selection
                </label>
                <div className={`flex items-center px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex -space-x-1 mr-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold border-2 border-gray-900 z-10">R</div>
                    <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-xs font-bold border-2 border-gray-900">₿</div>
                  </div>
                  <select className={`bg-transparent outline-none flex-1 appearance-none ${darkMode ? 'text-white' : 'text-black'}`}>
                    <option>RCAT/BTC (86.4% APR)</option>
                    <option>RPEPE/USDT (124.2% APR)</option>
                    <option>RSATS/BTC (46.8% APR)</option>
                    <option>RMOON/USDC (218.7% APR)</option>
                  </select>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Time Period
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button className={`py-2 rounded-lg text-center text-sm ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}>
                    30d
                  </button>
                  <button className={`py-2 rounded-lg text-center text-sm bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-orange-500`}>
                    90d
                  </button>
                  <button className={`py-2 rounded-lg text-center text-sm ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}>
                    180d
                  </button>
                  <button className={`py-2 rounded-lg text-center text-sm ${darkMode ? 'bg-gray-800/70 hover:bg-gray-700/70' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}>
                    1y
                  </button>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-gray-50'}`}>
                <h4 className="text-sm font-medium mb-3">Estimated Returns</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Total Rewards
                    </div>
                    <div className="font-medium">0.108 BTC</div>
                    <div className="text-xs text-green-500">$3,024</div>
                  </div>
                  <div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Average APY
                    </div>
                    <div className="font-medium">86.4%</div>
                    <div className="text-xs text-green-500">+2.4% with auto-compound</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium flex items-center justify-center">
                <Zap size={16} className="mr-1.5" />
                Stake Now
              </button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card darkMode={darkMode}>
          <CardHeader title="Market Activity" darkMode={darkMode}>
            <div className="flex space-x-2">
              <button className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-orange-500/10 text-orange-500' : 'bg-orange-50 text-orange-500'}`}>
                All
              </button>
              <button className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                Swaps
              </button>
              <button className={`px-2.5 py-1 rounded-md text-xs font-medium ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                Liquidity
              </button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assets
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                <TransactionRow
                  type="Swap"
                  from="BTC"
                  to="RCAT"
                  amount="$1,254"
                  address="0x7a...3e29"
                  time="2 mins ago"
                  darkMode={darkMode}
                />
                <TransactionRow
                  type="Add Liquidity"
                  from="BTC + RPEPE"
                  to="LP Token"
                  amount="$3,482"
                  address="0x3f...8a71"
                  time="15 mins ago"
                  darkMode={darkMode}
                />
                <TransactionRow
                  type="Harvest"
                  from="Farm"
                  to="RDOGE"
                  amount="$842"
                  address="0x9c...5e14"
                  time="32 mins ago"
                  darkMode={darkMode}
                />
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Card Components
interface CardProps {
  children: React.ReactNode;
  darkMode: boolean | null;
}

const Card = ({ children, darkMode }: CardProps) => (
  <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-gray-800 bg-[#111827]/50' : 'border-gray-200 bg-white'}`}>
    {children}
  </div>
);

interface CardHeaderProps {
  title: string;
  children?: React.ReactNode;
  darkMode: boolean;
}

const CardHeader = ({ title, children, darkMode }: CardHeaderProps) => (
  <div className={`px-4 py-3 flex items-center justify-between border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
    <h2 className="text-base font-semibold">{title}</h2>
    {children}
  </div>
);

// Metric Card
interface MetricCardProps {
  icon: any;
  title: string;
  value: string | number;
  change: string | number;
  positive: boolean | null;
  darkMode: boolean;
}

const MetricCard = ({ icon, title, value, change, positive, darkMode }: MetricCardProps) => (
  <div className={`rounded-xl border ${darkMode ? 'border-gray-800 bg-[#111827]/50' : 'border-gray-200 bg-white'} p-4`}>
    <div className="flex items-center justify-between mb-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
        positive === true 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' 
          : positive === false 
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-500'
      }`}>
        {change}
      </div>
    </div>
    <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

// Position Item
interface PositionItemProps {
  pairIcons: string[];
  pairName: string;
  pairColors: string[];
  tvl: string | number;
  apr: string | number;
  staked: string | number;
  rewards: string | number;
  darkMode: boolean;
}

const PositionItem = ({ pairIcons, pairName, pairColors, tvl, apr, staked, rewards, darkMode }: PositionItemProps) => (
  <div className={`p-4 ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <div className="flex -space-x-1 mr-2">
          <div className={`w-6 h-6 rounded-full ${pairColors[0]} text-white flex items-center justify-center text-xs font-bold border-2 ${darkMode ? 'border-gray-900' : 'border-white'} z-10`}>{pairIcons[0]}</div>
          <div className={`w-6 h-6 rounded-full ${pairColors[1]} ${pairIcons[1] === '₿' ? 'text-black' : 'text-white'} flex items-center justify-center text-xs font-bold border-2 ${darkMode ? 'border-gray-900' : 'border-white'}`}>{pairIcons[1]}</div>
        </div>
        <div>
          <div className="font-medium">{pairName}</div>
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-2">TVL: {tvl}</span>
            <span className="text-green-500">APR: {apr}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{staked}</div>
        <div className="text-xs text-green-500">{rewards} pending</div>
      </div>
    </div>
    <div className="flex space-x-2">
      <button className={`flex-1 py-1.5 text-xs font-medium rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
        Harvest
      </button>
      <button className={`flex-1 py-1.5 text-xs font-medium rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
        Unstake
      </button>
      <button className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
        Add Liquidity
      </button>
    </div>
  </div>
);

// Yield Item
interface YieldItemProps {
  pairIcons: string[];
  pairName: string;
  pairColors: string[];
  apr: string | number;
  tvl: string | number;
  warning: string | boolean | null | undefined;
  darkMode: boolean;
}

const YieldItem = ({ pairIcons, pairName, pairColors, apr, tvl, warning, darkMode }: YieldItemProps) => (
  <div className={`p-4 ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center">
        <div className="flex -space-x-1 mr-2">
          <div className={`w-6 h-6 rounded-full ${pairColors[0]} text-white flex items-center justify-center text-xs font-bold border-2 ${darkMode ? 'border-gray-900' : 'border-white'} z-10`}>{pairIcons[0]}</div>
          <div className={`w-6 h-6 rounded-full ${pairColors[1]} ${pairIcons[1] === '₿' ? 'text-black' : 'text-white'} flex items-center justify-center text-xs font-bold border-2 ${darkMode ? 'border-gray-900' : 'border-white'}`}>{pairIcons[1]}</div>
        </div>
        <div className="font-medium">{pairName}</div>
      </div>
      <div className="flex items-center">
        <span className="text-lg font-bold text-green-500">{apr}</span>
        <span className="ml-1 text-xs text-green-500">APR</span>
      </div>
    </div>
    
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center">
        <span className="text-xs text-gray-500">TVL: {tvl}</span>
        {warning && (
          <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500 rounded">
            {warning}
          </span>
        )}
      </div>
      <button className="px-3 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
        Farm
      </button>
    </div>
  </div>
);

// Transaction Row
interface TransactionRowProps {
  type: string;
  from: string;
  to: string;
  amount: string | number;
  address: string;
  time: string;
  darkMode: boolean;
}

const TransactionRow = ({ type, from, to, amount, address, time, darkMode }: TransactionRowProps) => (
  <tr className={darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}>
    <td className="px-4 py-3">
      <div className={`px-2 py-1 rounded text-xs font-medium inline-flex ${
        type === 'Swap' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500' 
          : type === 'Add Liquidity' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500'
      }`}>
        {type}
      </div>
    </td>
    <td className="px-4 py-3">
      <div className="flex items-center">
        <span>{from}</span>
        <ChevronRight size={14} className="mx-1 text-gray-400" />
        <span>{to}</span>
      </div>
    </td>
    <td className="px-4 py-3 font-medium">{amount}</td>
    <td className="px-4 py-3 text-sm">
      <div className="flex items-center">
        <span>{address}</span>
        <ExternalLink size={14} className="ml-1 text-gray-400" />
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-gray-500">{time}</td>
  </tr>
);

export default PremiumRunesDashboard;