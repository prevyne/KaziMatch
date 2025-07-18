const API_URL = "https://api-inference.huggingface.co/models/google/gemma-7b-it";

const buildPrompt = (seeker, job) => {
  const seekerProfileText = `
    - Headline: ${seeker.profile.headline}
    - Bio: ${seeker.profile.bio}
    - Skills: ${seeker.profile.skills.join(', ')}
  `;
  const jobDescriptionText = `
    - Job Title: ${job.title}
    - Job Description: ${job.description}
    - Requirements: ${job.requirements.join(', ')}
  `;

  return `
    Analyze the following candidate profile against the provided job description. 
    Your task is to respond ONLY with a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON.
    The JSON object must have these exact keys: "score", "summary", "strengths", "weaknesses".
    - "score": An integer from 0 to 100 representing the match quality.
    - "summary": A 2-sentence analysis.
    - "strengths": An array of 3 string bullet points.
    - "weaknesses": An array of 2 string bullet points.

    Here is the data:
    **Candidate Profile:**
    ${seekerProfileText}

    **Job Description:**
    ${jobDescriptionText}
  `;
};

export const performMatchAnalysis = async (seeker, job) => {
  console.log(`Starting Hugging Face AI analysis for seeker ${seeker._id} on job ${job._id}...`);

  const prompt = buildPrompt(seeker, job);
  
  try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        },
        body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
    }

    const responseData = await response.json();
    let generatedText = responseData[0].generated_text;
    
    const jsonStartIndex = generatedText.indexOf('{');
    if (jsonStartIndex === -1) {
      throw new Error("AI did not return valid JSON.");
    }
    const jsonResponseText = generatedText.substring(jsonStartIndex);

    const analysisResult = JSON.parse(jsonResponseText);

    console.log('Hugging Face AI analysis complete.');
    return analysisResult;

  } catch (error) {
    console.error("Error during Hugging Face AI analysis:", error.message);
    
    return {
      score: 0,
      summary: 'An error occurred during AI analysis. Please check the server logs.',
      strengths: [],
      weaknesses: [],
    };
  }
};