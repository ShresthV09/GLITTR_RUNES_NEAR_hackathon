// lib/claude/verification.ts
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function verifyCode(code: string, requirements: string) {
  const prompt = `
    You are a code quality and verification expert. 
    
    REQUIREMENTS:
    ${requirements}
    
    CODE TO VERIFY:
    ${code}
    
    Evaluate this code for:
    1. Correctness - Does it meet all the specified requirements?
    2. Quality - Is it well-structured, maintainable, and efficient?
    3. Security - Are there any security issues or vulnerabilities?
    
    Return your evaluation as a JSON object with these fields:
    - score: A number between 0-100 indicating overall compliance
    - issues: Array of specific issues found
    - strengths: Array of positive aspects
    - recommendations: Array of suggested improvements
    - security_concerns: Array of security issues if any
    
    JSON RESPONSE:
  `;

  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 4000,
    temperature: 0.2,
    system: "You are a code quality expert that responds only with valid JSON.",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  try {
    // Extract the JSON from the response
    const contentBlock = response.content[0];
    const jsonStr = contentBlock.type === "text" ? contentBlock.text : "";
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Error parsing Claude response:", e);
    return {
      error: "Failed to parse verification response",
      raw_response:
        response.content[0].type === "text"
          ? response.content[0].text
          : JSON.stringify(response.content),
    };
  }
}
