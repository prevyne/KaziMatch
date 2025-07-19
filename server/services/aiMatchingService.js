export const performMatchAnalysis = (seeker, job) => {
  console.log(`Performing ALGORITHMIC analysis for seeker ${seeker._id} on job ${job._id}...`);

  // Ensure profile and job data exist to prevent errors
  const seekerSkills = (seeker.profile?.skills || []).map(s => s.toLowerCase().trim());
  const jobRequirements = (job.requirements || []).map(r => r.toLowerCase().trim());

  if (jobRequirements.length === 0) {
    return {
      score: 50, // Neutral score if job has no listed requirements
      summary: "Cannot determine match quality as the job has no specific skill requirements listed.",
      strengths: ["N/A"],
      weaknesses: ["No requirements listed by employer."],
    };
  }

  // --- Core Scoring Logic ---

  // 1. Calculate Skill Match
  const matchedSkills = jobRequirements.filter(req => seekerSkills.includes(req));
  const skillScore = (matchedSkills.length / jobRequirements.length) * 100;

  // 2. Determine Final Score (we can add more logic here later)
  const finalScore = Math.round(skillScore);
  
  // --- Generate Analysis Text ---

  // 3. Find Missing Skills
  const missingSkills = jobRequirements.filter(req => !seekerSkills.includes(req));

  // 4. Generate a Dynamic Summary
  let summary = `The candidate is a ${finalScore}% match based on direct skill alignment. `;
  if (finalScore > 80) {
    summary += "They appear to be a very strong fit for the required skill set.";
  } else if (finalScore > 60) {
    summary += "They possess a good number of the required skills.";
  } else {
    summary += "There are several gaps in the required skill set.";
  }

  console.log('ALGORITHMIC analysis complete.');

  return {
    score: finalScore,
    summary: summary,
    strengths: matchedSkills.length > 0 ? matchedSkills.map(s => `Proficient in ${s}`) : ["No direct skill matches found."],
    weaknesses: missingSkills.length > 0 ? missingSkills.map(s => `Lacks experience in ${s}`) : ["Covers all listed skill requirements."],
  };
};