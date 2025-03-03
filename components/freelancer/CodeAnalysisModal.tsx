
'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  AlertCircle, 
  Shield, 
  Code, 
  BarChart, 
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  
} from 'lucide-react';
import Modal from '../ui/Modal';
import { CodeAnalysisResponse } from '../../lib/gpt-api';

interface CodeAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: CodeAnalysisResponse | null;
  jobId: string;
  jobTitle: string;
  isLoading?: boolean;
}

const CodeAnalysisModal: React.FC<CodeAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
  jobId,
  jobTitle,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    security: true,
    quality: false,
    tests: false,
    requirements: false,
    performance: false,
    suggestions: true
  });
  
  
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  if (isLoading || !analysisResult) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Analyzing Code..." size="lg">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-300">
            Our AI is analyzing your code submission...
          </p>
          <p className="mt-2 text-sm text-gray-400">
            This might take a minute or two depending on the complexity of your code.
          </p>
        </div>
      </Modal>
    );
  }
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getTrendIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="ml-1 text-green-400" size={16} />;
    if (score >= 60) return <AlertTriangle className="ml-1 text-yellow-400" size={16} />;
    return <XCircle className="ml-1 text-red-400" size={16} />;
  };
  
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-2 flex items-center">
            <span className={getScoreColor(analysisResult.score)}>{analysisResult.score}%</span>
            {getTrendIcon(analysisResult.score)}
          </div>
          <div className="text-sm text-gray-300">Overall Score</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-2 flex items-center">
            <span className={getScoreColor(analysisResult.analysis.quality.score)}>
              {analysisResult.analysis.quality.grade}
            </span>
          </div>
          <div className="text-sm text-gray-300">Code Quality</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-2 flex items-center">
            <span className={analysisResult.analysis.tests.failed === 0 ? 'text-green-400' : 'text-yellow-400'}>
              {analysisResult.analysis.tests.passed}/{analysisResult.analysis.tests.total}
            </span>
          </div>
          <div className="text-sm text-gray-300">Tests Passed</div>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <p className="text-gray-300">{analysisResult.summary}</p>
      </div>
      
      {/* Requirements Section */}
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-600"
          onClick={() => toggleSection('requirements')}
        >
          <h3 className="text-lg font-medium flex items-center">
            <CheckCircle2 className="mr-2 text-blue-400" size={18} />
            Requirements Fulfillment
          </h3>
          <div className="flex items-center">
            <span className={getScoreColor(
              (analysisResult.analysis.requirements.fulfilled / analysisResult.analysis.requirements.total) * 100
            )}>
              {analysisResult.analysis.requirements.fulfilled}/{analysisResult.analysis.requirements.total}
            </span>
            {expandedSections.requirements ? 
              <ChevronUp className="ml-2" size={18} /> : 
              <ChevronDown className="ml-2" size={18} />
            }
          </div>
        </div>
        
        {expandedSections.requirements && (
          <div className="p-4 border-t border-gray-600">
            <div className="space-y-2">
              {analysisResult.analysis.requirements.items.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  {item.fulfilled ? 
                    <CheckCircle size={16} className="mr-2 text-green-400 shrink-0 mt-1" /> : 
                    <XCircle size={16} className="mr-2 text-red-400 shrink-0 mt-1" />
                  }
                  <div>
                    <div className="font-medium">{item.requirement}</div>
                    {item.notes && <div className="text-sm text-gray-400">{item.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Suggestions Section */}
      <div className="bg-gray-700 rounded-lg overflow-hidden">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-600"
          onClick={() => toggleSection('suggestions')}
        >
          <h3 className="text-lg font-medium flex items-center">
            <Zap className="mr-2 text-yellow-400" size={18} />
            Key Suggestions
          </h3>
          <div>
            {expandedSections.suggestions ? 
              <ChevronUp size={18} /> : 
              <ChevronDown size={18} />
            }
          </div>
        </div>
        
        {expandedSections.suggestions && (
          <div className="p-4 border-t border-gray-600">
            <div className="space-y-4">
              {analysisResult.suggestions.map((suggestion, idx) => (
                <div key={idx} className="pb-3 border-b border-gray-600 last:border-0 last:pb-0">
                  <div className="flex items-center mb-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      suggestion.priority === 'high' ? 'bg-red-400' :
                      suggestion.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></span>
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-600">
                      {suggestion.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 ml-4">{suggestion.description}</p>
                  {suggestion.codeSnippet && (
                    <div className="ml-4 mt-2 bg-gray-800 p-2 rounded text-sm font-mono text-gray-300 overflow-x-auto">
                      <pre>{suggestion.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Security Assessment</h3>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-red-400 font-bold text-xl">
              {analysisResult.analysis.security.vulnerabilities.critical}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-orange-400 font-bold text-xl">
              {analysisResult.analysis.security.vulnerabilities.high}
            </div>
            <div className="text-xs text-gray-400">High</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-yellow-400 font-bold text-xl">
              {analysisResult.analysis.security.vulnerabilities.medium}
            </div>
            <div className="text-xs text-gray-400">Medium</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-blue-400 font-bold text-xl">
              {analysisResult.analysis.security.vulnerabilities.low}
            </div>
            <div className="text-xs text-gray-400">Low</div>
          </div>
        </div>
      </div>
      
      {analysisResult.analysis.security.vulnerabilities.issues.map((issue, idx) => (
        <div key={idx} className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              issue.severity === 'critical' ? 'bg-red-500' :
              issue.severity === 'high' ? 'bg-orange-500' :
              issue.severity === 'medium' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}></span>
            <h4 className="text-lg font-medium">{issue.title}</h4>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-gray-600">
              {issue.severity}
            </span>
          </div>
          {issue.location && (
            <div className="mb-2 text-sm text-gray-400">
              <span className="font-mono bg-gray-800 px-1 py-0.5 rounded">
                {issue.location}
              </span>
            </div>
          )}
          <p className="text-gray-300 mb-3">{issue.description}</p>
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="text-sm text-blue-400 mb-1">Suggestion:</div>
            <div className="text-sm">{issue.suggestion}</div>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderQuality = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="text-lg font-medium mb-1">Code Quality Assessment</h3>
          <div className="text-sm text-gray-300">
            Overall quality grade: <span className="font-bold">{analysisResult.analysis.quality.grade}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold">{analysisResult.analysis.quality.metrics.complexity}/10</div>
            <div className="text-xs text-gray-400">Complexity</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{analysisResult.analysis.quality.metrics.maintainability}/10</div>
            <div className="text-xs text-gray-400">Maintainability</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{analysisResult.analysis.quality.metrics.reusability}/10</div>
            <div className="text-xs text-gray-400">Reusability</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Quality Issues</h3>
        <div className="space-y-4">
          {analysisResult.analysis.quality.issues.map((issue, idx) => (
            <div key={idx} className="pb-4 border-b border-gray-600 last:border-0 last:pb-0">
              <div className="flex items-center mb-1">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  issue.priority === 'high' ? 'bg-red-400' :
                  issue.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></span>
                <h4 className="font-medium">{issue.title}</h4>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-600">
                  {issue.priority}
                </span>
              </div>
              {issue.location && (
                <div className="ml-4 mb-1 text-sm text-gray-400">
                  <span className="font-mono bg-gray-800 px-1 py-0.5 rounded">
                    {issue.location}
                  </span>
                </div>
              )}
              <p className="text-sm text-gray-300 ml-4 mb-2">{issue.description}</p>
              <div className="ml-4 bg-gray-800 p-2 rounded-lg">
                <div className="text-xs text-blue-400 mb-1">Suggestion:</div>
                <div className="text-sm">{issue.suggestion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderTests = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-lg font-medium mb-2 md:mb-0">Test Results</h3>
        <div className="flex space-x-4">
          <div className="bg-green-900/20 border border-green-700 rounded-lg px-3 py-1 text-center">
            <div className="text-green-400 font-bold">{analysisResult.analysis.tests.passed}</div>
            <div className="text-xs text-green-400">Passed</div>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded-lg px-3 py-1 text-center">
            <div className="text-red-400 font-bold">{analysisResult.analysis.tests.failed}</div>
            <div className="text-xs text-red-400">Failed</div>
          </div>
          <div className="bg-gray-800 rounded-lg px-3 py-1 text-center">
            <div className="text-white font-bold">{analysisResult.analysis.tests.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {analysisResult.analysis.tests.results.map((test, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg border ${
              test.status === 'pass' 
                ? 'bg-green-900/20 border-green-700/50' 
                : 'bg-red-900/20 border-red-700/50'
            }`}
          >
            <div className="flex items-center">
              {test.status === 'pass' 
                ? <CheckCircle className="text-green-400 mr-2" size={16} /> 
                : <XCircle className="text-red-400 mr-2" size={16} />
              }
              <h4 className="font-medium">{test.name}</h4>
            </div>
            <p className="text-sm ml-6 mt-1 text-gray-300">{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Performance Score</h3>
          <div className={`text-2xl font-bold ${getScoreColor(analysisResult.analysis.performance?.score || 0)}`}>
            {analysisResult.analysis.performance?.score || 0}%
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${
              (analysisResult.analysis.performance?.score || 0) >= 80 
                ? 'bg-green-500' 
                : (analysisResult.analysis.performance?.score || 0) >= 60 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}
            style={{ width: `${analysisResult.analysis.performance?.score || 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Performance Issues</h3>
        <div className="space-y-4">
          {analysisResult.analysis.performance?.issues.map((issue, idx) => (
            <div key={idx} className="pb-4 border-b border-gray-600 last:border-0 last:pb-0">
              <div className="flex items-center mb-1">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  issue.impact === 'high' ? 'bg-red-400' :
                  issue.impact === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></span>
                <h4 className="font-medium">{issue.title}</h4>
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-600">
                  {issue.impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-300 ml-4 mb-2">{issue.description}</p>
              <div className="ml-4 bg-gray-800 p-2 rounded-lg">
                <div className="text-xs text-blue-400 mb-1">Suggestion:</div>
                <div className="text-sm">{issue.suggestion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`AI Analysis: ${jobTitle}`} size="xl">
      <div className="mb-4 bg-gray-800 rounded-lg p-2 flex overflow-x-auto">
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
            activeTab === 'overview' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium ml-1 whitespace-nowrap ${
            activeTab === 'security' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('security')}
        >
          <Shield className="inline-block mr-1" size={14} /> Security
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium ml-1 whitespace-nowrap ${
            activeTab === 'quality' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('quality')}
        >
          <Code className="inline-block mr-1" size={14} /> Code Quality
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium ml-1 whitespace-nowrap ${
            activeTab === 'tests' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('tests')}
        >
          <CheckCircle className="inline-block mr-1" size={14} /> Tests ({analysisResult.analysis.tests.passed}/{analysisResult.analysis.tests.total})
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium ml-1 whitespace-nowrap ${
            activeTab === 'performance' 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('performance')}
        >
          <Zap className="inline-block mr-1" size={14} /> Performance
        </button>
      </div>
      
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'quality' && renderQuality()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'performance' && renderPerformance()}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
        <button 
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CodeAnalysisModal;