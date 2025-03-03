import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface VerificationResult {
  score: number;
  issues: string[];
  strengths: string[];
  recommendations: string[];
  security_concerns: string[];
  status: "pass" | "fail";
}

/**
 * Verify code submission against requirements using GPT
 * @param code - The code to verify
 * @param requirements - The requirements to verify against
 * @returns Verification result with score and analysis
 */
export async function verifyCode(
  code: string,
  requirements: string
): Promise<VerificationResult> {
  try {
    // Analyze code with GPT using schema validation
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are a code quality expert that analyzes code submissions against requirements.
          Evaluate thoroughly and provide a fair assessment with concrete issues and recommendations.
          Return only valid JSON conforming to the specified schema.`,
        },
        {
          role: "user",
          content: `
            Evaluate this code submission against the provided requirements.
            
            REQUIREMENTS:
            ${requirements}
            
            CODE TO VERIFY:
            ${code}
            
            Return a comprehensive analysis including:
            1. Overall quality and correctness score (0-100)
            2. Whether it passes requirements (score >= 80 is passing)
            3. Specific issues found
            4. Code strengths
            5. Recommendations for improvement
            6. Any security concerns
          `,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "verification_result",
          schema: {
            type: "object",
            properties: {
              score: {
                type: "number",
                description: "Overall score from 0-100",
              },
              status: {
                type: "string",
                enum: ["pass", "fail"],
                description: "Pass if score >= 80, fail otherwise",
              },
              issues: {
                type: "array",
                items: { type: "string" },
                description: "List of issues found in the code",
              },
              strengths: {
                type: "array",
                items: { type: "string" },
                description: "List of code strengths",
              },
              recommendations: {
                type: "array",
                items: { type: "string" },
                description: "List of recommendations for improvement",
              },
              security_concerns: {
                type: "array",
                items: { type: "string" },
                description: "List of security issues if any",
              },
            },
            required: [
              "score",
              "status",
              "issues",
              "strengths",
              "recommendations",
              "security_concerns",
            ],
          },
        },
      },
    });

    const result = JSON.parse(
      response.choices[0].message.content || "{}"
    ) as VerificationResult;

    // If status is not already set, determine it from the score
    if (!result.status) {
      result.status = result.score >= 80 ? "pass" : "fail";
    }

    return result;
  } catch (error) {
    console.error("Error in GPT verification:", error);
    return {
      score: 0,
      status: "fail",
      issues: ["Failed to complete verification due to technical error"],
      strengths: [],
      recommendations: ["Retry verification"],
      security_concerns: [],
    };
  }
}
