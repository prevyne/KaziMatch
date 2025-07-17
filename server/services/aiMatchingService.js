import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI client with the API key from our .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to create the detailed prompt for the AI
const buildPrompt = (seeker, job) => {
  // Consolidate the seeker's information into a readable text block
  const seekerProfileText = `
    - Headline: ${seeker.profile.headline}
    - Bio: ${seeker.profile.bio}
    - Skills: ${seeker.profile.skills.join(', ')}
    - Experience: ${seeker.profile.experience.map(e => `${e.title} at ${e.company} (${e.years} years)`).join('; ')}
  `;

  // Consolidate the job's information
  const jobDescriptionText = `
    - Job Title: ${job.title}
    - Job Description: ${job.description}
    - Requirements: ${job.requirements.join(', ')}
  `;

  // The final prompt instructing the AI what to do
  return `
    Analyze the following candidate profile against the provided job description. 
    Based on their skills and experience, provide a comprehensive analysis.

    **Candidate Profile:**
    ${seekerProfileText}

    **Job Description:**
    ${jobDescriptionText}

    **Your Task:**
    1. Provide a "score" from 0 to 100 representing how well the candidate matches the job requirements. A score of 85+ is a strong match.
    2. Provide a concise "summary" (2-3 sentences) of your analysis.
    3. Provide a bulleted list of the candidate's key "strengths" for this role.
    4. Provide a bulleted list of the candidate's potential "weaknesses" or areas where they lack direct experience.

    Respond ONLY with a valid JSON object. Do not include any text or markdown formatting before or after the JSON.
    The JSON object must have these exact keys: "score", "summary", "strengths", "weaknesses".
    Example JSON format:
    {
      "score": 88,
      "summary": "This is a strong candidate with relevant experience in key technologies, though they lack specific domain knowledge.",
      "strengths": ["5+ years with the MERN stack.", "Demonstrated leadership experience."],
      "weaknesses": ["No direct experience in the fintech industry.", "Lacks familiarity with GraphQL."]
    }
  `;
};

export const performMatchAnalysis = async (seeker, job) => {
  try {
    console.log(`Starting REAL AI analysis for seeker ${seeker._id} on job ${job._id}...`);

    // Select the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Build the detailed prompt
    const prompt = buildPrompt(seeker, job);

    // Send the prompt to the AI and get the result
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text();

    // The AI response might include markdown formatting, so we clean it
    const cleanedJsonText = jsonText.replace('```json', '').replace('```', '').trim();
    
    // Parse the JSON text into a JavaScript object
    const analysisResult = JSON.parse(cleanedJsonText);
    
    console.log('REAL AI analysis complete.');
    return analysisResult;

  } catch (error) {
    console.error("Error during AI analysis:", error);
    // If the AI fails, return a default "error" state so the app doesn't crash
    return {
      score: 0,
      summary: 'An error occurred during AI analysis. Please check the server logs.',
      strengths: [],
      weaknesses: [],
    };
  }
};