export const performMatchAnalysis = async (seeker, job) => {
  console.log(`Performing AI analysis for seeker ${seeker._id} on job ${job._id}...`);

  // Simulate AI processing delay of 1.5 seconds
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mocked AI response
  const mockScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60; // Random score: 60-95
  const mockSummary = `This candidate shows a strong alignment with the core requirements, making them a promising fit.`;
  const mockStrengths = ['Extensive experience with the MERN stack.', 'Proven ability in team leadership roles.', 'Strong portfolio of relevant projects.'];
  const mockWeaknesses = ['Limited experience with cloud deployment pipelines.', 'Fewer years of experience than the ideal candidate.'];

  console.log('AI analysis complete.');

  return {
    score: mockScore,
    summary: mockSummary,
    strengths: mockStrengths,
    weaknesses: mockWeaknesses,
  };
};