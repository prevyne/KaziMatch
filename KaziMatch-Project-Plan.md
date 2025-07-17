Project Vision (Revised)
KaziMatch will be a user-centric job platform where seekers can actively search for and apply to jobs. The AI will serve as a powerful assistant, highlighting the best-fit opportunities for seekers and ranking the most qualified applicants for employers.
Core User Flow (New)
    1. Employer: Posts a new job. The job is now publicly listed.
    2. Job Seeker: Logs in and browses a central "Jobs" page. For each job in the list, they see a personalized "Match Score" calculated by the AI.
    3. Job Seeker: Clicks on a job to view details and clicks "Apply."
    4. Application: An Application is created in the database, linking the seeker to the job.
    5. Employer: Views their dashboard, sees the number of new applicants for their job, and clicks to view them.
    6. AI Ranking: The employer sees a list of all applicants, automatically sorted from the highest to the lowest "Match Score," with the AI's summary for each candidate readily available.
Revised Architecture & Development Plan
This new plan will be executed in phases to ensure a clean transition.
Phase 1: Backend Refactoring (The Foundation)
    • New Application Model:
        ◦ Create a Mongoose schema for Application containing job, seeker, employer, status (applied, viewed, etc.), and a reference to the Match analysis.
    • New Application API (/api/applications):
        ◦ POST /:job_id: The "Apply" button will hit this endpoint. When an application is created, the server will immediately trigger the AI analysis for that specific seeker/job pair and save the result in the Match collection.
        ◦ GET /job/:job_id: For employers to fetch all applications (and their associated match scores) for a specific job.
        ◦ GET /seeker/me: For seekers to fetch a list of jobs they have applied to.
    • Modify Job API (/api/jobs):
        ◦ The GET / endpoint will be enhanced. If the request comes from an authenticated seeker, the backend will calculate and embed the match score for each job relative to that seeker.
Phase 2: Frontend Refactoring (The User Experience)
    • New "Jobs" Page (/jobs):
        ◦ This will be a public-facing page that lists all available jobs.
        ◦ If a seeker is logged in, each job card will display their personalized AI match score.
        ◦ Will include search and filter capabilities.
    • New "Job Details" Page (/jobs/:id):
        ◦ Shows comprehensive details for a single job.
        ◦ Features a prominent "Apply" button.
    • Revamp Employer Dashboard:
        ◦ The dashboard will now list the employer's jobs along with a count of new applicants for each.
        ◦ Clicking a job will navigate to a new "Applicants" page.
    • New "Applicants" Page:
        ◦ Displays a list of all candidates who applied for a specific job.
        ◦ Candidates will be sorted by their AI match score by default.
        ◦ Each candidate card will show the match score and the AI's summary analysis.
    • Revamp Seeker Dashboard:
        ◦ Will now feature two main sections: "My Top Matched Jobs" (a curated list) and "My Applications".
This new architecture is more robust, intuitive, and aligns perfectly with user expectations for a modern job platform. It's a significant improvement.

