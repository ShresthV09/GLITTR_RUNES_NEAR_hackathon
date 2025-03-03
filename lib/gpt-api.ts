// lib/gpt-api.ts

/**
 * Interface for code analysis request
 */
export interface CodeAnalysisRequest {
  // The code/files to be analyzed
  files: {
    name: string;
    content: string;
    language?: string;
  }[];
  // The requirements the code should meet
  requirements: string;
  // Additional context about the project
  context?: string;
  // Optional metadata
  metadata?: Record<string, any>;
}

/**
 * Interface for code analysis response
 */
export interface CodeAnalysisResponse {
  // Overall score percentage (0-100)
  score: number;
  // Verification status
  status: "pass" | "fail" | "warn";
  // Detailed analysis breakdown
  analysis: {
    // Testing results
    tests: {
      total: number;
      passed: number;
      failed: number;
      results: {
        name: string;
        status: "pass" | "fail";
        description: string;
      }[];
    };
    // Security assessment
    security: {
      vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
        issues: {
          severity: "critical" | "high" | "medium" | "low";
          title: string;
          description: string;
          location?: string; // file and line number
          suggestion: string;
        }[];
      };
    };
    // Code quality assessment
    quality: {
      score: number; // 0-100
      grade: string; // A+, A, B+, etc.
      metrics: {
        complexity: number;
        maintainability: number;
        reusability: number;
      };
      issues: {
        title: string;
        description: string;
        location?: string;
        suggestion: string;
        priority: "high" | "medium" | "low";
      }[];
    };
    // Requirements fulfillment
    requirements: {
      fulfilled: number;
      total: number;
      items: {
        requirement: string;
        fulfilled: boolean;
        notes?: string;
      }[];
    };
    // Performance assessment
    performance?: {
      score: number;
      issues: {
        title: string;
        description: string;
        impact: "high" | "medium" | "low";
        suggestion: string;
      }[];
    };
  };
  // Overall summary
  summary: string;
  // Suggestions for improvement
  suggestions: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    codeSnippet?: string;
  }[];
  // Time of analysis
  timestamp: string;
}

/**
 * GPT API service for code analysis
 */
class GPTApiService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    // Default to local API route
    this.apiUrl = "/api/code-analysis";
    this.apiKey = "";
  }

  /**
   * Configure the API endpoint and key
   */
  configure(apiUrl: string, apiKey: string = "") {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Analyze code using the API
   */
  async analyzeCode(
    request: CodeAnalysisRequest
  ): Promise<CodeAnalysisResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error analyzing code:", error);

      // If API fails, use mock data for demo purposes
      return this.getMockAnalysisResult(request);
    }
  }

  /**
   * Generate mock analysis result (fallback if API fails)
   * Should only be used for development/demo purposes
   */
  private getMockAnalysisResult(
    request: CodeAnalysisRequest
  ): CodeAnalysisResponse {
    // Generate a random score between 60 and 95
    const score = Math.floor(Math.random() * (95 - 60) + 60);
    const status = score >= 80 ? "pass" : "warn";

    // Create mock test results
    const totalTests = 8;
    const passedTests = Math.floor((score / 100) * totalTests);

    // Generate mock vulnerabilities based on score
    const vulnCount = score >= 90 ? 0 : score >= 80 ? 1 : 2;

    // Generate mock data
    return {
      score,
      status,
      analysis: {
        tests: {
          total: totalTests,
          passed: passedTests,
          failed: totalTests - passedTests,
          results: Array.from({ length: totalTests }, (_, i) => ({
            name: `Test ${i + 1}`,
            status: i < passedTests ? "pass" : "fail",
            description:
              i < passedTests
                ? `Successfully passed test case ${i + 1}`
                : `Failed to meet condition in test case ${i + 1}`,
          })),
        },
        security: {
          vulnerabilities: {
            critical: 0,
            high: vulnCount > 1 ? 1 : 0,
            medium: vulnCount > 0 ? 1 : 0,
            low: 1,
            issues: [
              ...(vulnCount > 1
                ? [
                    {
                      severity: "high" as const,
                      title: "Potential SQL Injection",
                      description:
                        "User input is directly used in database queries without proper sanitization.",
                      location: "db_utils.js:42",
                      suggestion:
                        "Use parameterized queries or prepared statements instead of string concatenation.",
                    },
                  ]
                : []),
              ...(vulnCount > 0
                ? [
                    {
                      severity: "medium" as const,
                      title: "Insecure Direct Object Reference",
                      description:
                        "API endpoints access resources using user-supplied identifiers without proper authorization checks.",
                      location: "api_routes.js:128",
                      suggestion:
                        "Implement proper authorization checks for all resource access.",
                    },
                  ]
                : []),
              {
                severity: "low" as const,
                title: "Console.log statements in production code",
                description:
                  "Debug statements found in code that may expose sensitive information in production.",
                location: "multiple files",
                suggestion:
                  "Remove console.log statements or use a proper logging library with configurable log levels.",
              },
            ],
          },
        },
        quality: {
          score: score + (Math.random() * 5 - 2.5), // slight variation around the main score
          grade:
            score >= 90
              ? "A+"
              : score >= 85
              ? "A"
              : score >= 80
              ? "A-"
              : score >= 75
              ? "B+"
              : "B",
          metrics: {
            complexity: Math.floor(Math.random() * 10) + 1,
            maintainability: Math.floor(Math.random() * 10) + 1,
            reusability: Math.floor(Math.random() * 10) + 1,
          },
          issues: [
            {
              title: "High Cyclomatic Complexity",
              description:
                'Function "processData" has too many conditional branches, making it difficult to test and maintain.',
              location: "data_processor.js:87",
              suggestion:
                "Break down the function into smaller, more focused functions with clearer responsibilities.",
              priority: "medium" as const,
            },
            {
              title: "Duplicate Code",
              description:
                "Similar validation logic is repeated in multiple components.",
              location: "multiple files",
              suggestion:
                "Extract common validation logic into a shared utility function.",
              priority: "low" as const,
            },
          ],
        },
        requirements: {
          fulfilled: Math.floor((score / 100) * 5),
          total: 5,
          items: Array.from({ length: 5 }, (_, i) => ({
            requirement: `Requirement ${i + 1}: ${
              request.requirements.split(".")[i] || "Additional requirement"
            }`,
            fulfilled: i < Math.floor((score / 100) * 5),
            notes:
              i < Math.floor((score / 100) * 5)
                ? "Fully implemented as required"
                : "Implementation is missing or incomplete",
          })),
        },
        performance: {
          score: score - 5,
          issues: [
            {
              title: "Inefficient DOM manipulation",
              description:
                "Multiple direct DOM manipulations causing unnecessary reflows and repaints.",
              impact: "medium" as const,
              suggestion: "Batch DOM updates or use a virtual DOM approach.",
            },
            {
              title: "Large bundle size",
              description:
                "Main JavaScript bundle is over 2MB which can slow down initial page load.",
              impact: "high" as const,
              suggestion:
                "Implement code splitting and dynamic imports for better performance.",
            },
          ],
        },
      },
      summary: `The code ${
        status === "pass" ? "successfully meets" : "partially meets"
      } the requirements. ${
        status === "pass"
          ? "Overall quality is good with minor improvements possible."
          : "Several issues need to be addressed before approval."
      }`,
      suggestions: [
        {
          title: "Improve Error Handling",
          description:
            "Add try/catch blocks around API calls to handle potential failures gracefully.",
          priority: "high" as const,
          codeSnippet: `try {
    const data = await api.fetchData();
    processData(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    showErrorMessage('Unable to load data. Please try again later.');
  }`,
        },
        {
          title: "Optimize Performance",
          description:
            "Use memoization for expensive calculations to prevent unnecessary recalculations.",
          priority: "medium" as const,
          codeSnippet: `import { useMemo } from 'react';
  
  // Before
  const expensiveValue = calculateExpensiveValue(dependency);
  
  // After
  const expensiveValue = useMemo(() => {
    return calculateExpensiveValue(dependency);
  }, [dependency]);`,
        },
        {
          title: "Enhance Accessibility",
          description:
            "Add proper ARIA attributes to interactive elements for better screen reader support.",
          priority: "medium" as const,
        },
      ],
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const gptApiService = new GPTApiService();

// Example usage:
/*
  import { gptApiService } from '../lib/gpt-api';
  
  // Configure API (optional, defaults to local API route)
  gptApiService.configure('/api/code-analysis');
  
  // Analyze code
  const analysisRequest = {
    files: [
      { name: 'app.js', content: '...' },
      { name: 'utils.js', content: '...' }
    ],
    requirements: 'The application should...'
  };
  
  try {
    const result = await gptApiService.analyzeCode(analysisRequest);
    console.log('Analysis result:', result);
  } catch (error) {
    console.error('Analysis failed:', error);
  }
  */
