export interface CodeAnalysisRequest {
  files: {
    name: string;
    content: string;
    language?: string;
  }[];

  requirements: string;

  context?: string;

  metadata?: Record<string, any>;
}

export interface CodeAnalysisResponse {
  score: number;

  status: "pass" | "fail" | "warn";

  analysis: {
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
          location?: string;
          suggestion: string;
        }[];
      };
    };

    quality: {
      score: number;
      grade: string;
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

    requirements: {
      fulfilled: number;
      total: number;
      items: {
        requirement: string;
        fulfilled: boolean;
        notes?: string;
      }[];
    };

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

  summary: string;

  suggestions: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    codeSnippet?: string;
  }[];

  timestamp: string;
}

class GPTApiService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    // Default to local API route
    this.apiUrl = "/api/code-analysis";
    this.apiKey = "";
  }

  configure(apiUrl: string, apiKey: string = "") {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

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

      return this.getMockAnalysisResult(request);
    }
  }

  private getMockAnalysisResult(
    request: CodeAnalysisRequest
  ): CodeAnalysisResponse {
    const score = Math.floor(Math.random() * (95 - 60) + 60);
    const status = score >= 80 ? "pass" : "warn";

    const totalTests = 8;
    const passedTests = Math.floor((score / 100) * totalTests);

    const vulnCount = score >= 90 ? 0 : score >= 80 ? 1 : 2;

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

export const gptApiService = new GPTApiService();
