# KaziMatch

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-blue.svg)](https://www.mongodb.com/mern-stack)

KaziMatch is a modern, user-centric job platform built on the MERN stack. It leverages AI to create a powerful bridge between job seekers and employers, highlighting the best-fit opportunities for candidates and ranking the most qualified applicants for companies.

---

## Core Features

-   **Dual User Roles:** Separate registration and dashboard experiences for Job Seekers and Employers.
-   **AI-Powered Match Scoring:**
    -   **For Seekers:** See a personalized AI-generated match score for every job listing.
    -   **For Employers:** View a ranked list of applicants for any job, sorted from highest to lowest match score.
-   **Comprehensive Job Management:** Employers can create, view, update, and delete job postings.
-   **Advanced Job Search:** Seekers can browse and filter all available jobs by keywords, location, and job type.
-   **Detailed Seeker Profiles:** Job seekers can build out their profiles with skills, work experience, and education.
-   **Streamlined Application Process:** Simple "Apply" functionality that links seekers to jobs and triggers the AI analysis.
-   **Secure Authentication:** User authentication is handled with JWT and secure `httpOnly` cookies.

---

## Tech Stack

-   **Frontend:** React, Vite, React Router, Axios
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose)
-   **AI Integration:** Hugging Face Inference API

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   Node.js (v18 or later recommended)
-   MongoDB (A local instance or a free MongoDB Atlas cluster URI)
-   A Hugging Face account and an Access Token (API Key)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd kazimatch
    ```

2.  **Set up Environment Variables:**
    -   The `server/.env` file contains all the secret keys and is ignored by Git for security.
    -   Navigate to the `server` directory.
    -   Create your own `.env` file by copying the template:
        ```bash
        cp .env.example .env
        ```
    -   Now, open the newly created `.env` file and add your secret keys (MongoDB URI, JWT Secret, Hugging Face API Key).

3.  **Install All Dependencies:**
    -   Navigate back to the **root `kazimatch/` directory**.
    -   Run the master installation script:
    ```bash
    npm install concurrently && npm run install-all
    ```

### Running the Application

1.  From the **root `kazimatch/` directory**, run the development server:
    ```bash
    npm run dev
    ```
2.  This command will start both the backend server (on `http://localhost:5000`) and the frontend Vite server.
3.  Open your browser and navigate to the frontend URL to use the application.