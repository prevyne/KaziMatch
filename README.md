# KaziMatch

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-blue.svg)](https://www.mongodb.com/mern-stack) [![UI Responsive](https://img.shields.io/badge/UI-Responsive-green.svg)]()

KaziMatch is a modern, user-centric job platform built on the MERN stack. It leverages a sophisticated matching engine to create a powerful bridge between job seekers and employers, highlighting the best-fit opportunities for candidates and ranking the most qualified applicants for companies.

---

## Core Features

-   **Dual User Roles:** Separate registration and dashboard experiences for Job Seekers and Employers.
-   **Intelligent Match Scoring:**
    -   **For Seekers:** See a personalized, data-driven match score for every job listing.
    -   **For Employers:** View a ranked list of applicants for any job, sorted from highest to lowest score.
-   **Comprehensive Application Management:** Employers can update an applicant's status (Viewed, Interviewing, etc.) or delete applications directly from their dashboard.
-   **Full Job CRUD:** Employers can create, view, update, and delete job postings.
-   **Advanced Job Search:** All users can browse and filter available jobs by keywords, location, and job type.
-   **Detailed Seeker Profiles:** Job seekers can build out rich profiles with skills, work history, and education to improve matching accuracy.
-   **Fully Responsive UI:** A seamless user experience across all devices—mobile, tablet, and desktop—thanks to a refactor using CSS Modules.
-   **Secure Authentication:** User authentication is handled with JWT and secure, cross-site `httpOnly` cookies.

---

## Tech Stack

-   **Frontend:** React, Vite, React Router, Axios, CSS Modules
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose)
-   **Matching Engine:** A swappable service layer supporting:
    -   A live **Hugging Face Inference API** model for deep analysis.
    -   A deterministic, offline **JavaScript-based algorithm** for local development and reliability.

---

## Matching Engine Logic

The `aiMatchingService.js` on the backend is designed to be modular. The project includes implementations for three different modes:

1.  **Live AI Mode (Hugging Face):** Connects to a live Large Language Model (e.g., `google/gemma-7b-it` or `mistralai/Mistral-7B-Instruct-v0.2`) for nuanced, context-aware analysis. This is ideal for production.
2.  **Algorithmic Mode:** A fast, offline, and deterministic algorithm that runs locally. It calculates a score based on direct skill matching between a seeker's profile and a job's requirements. This is excellent for credibility and offline functionality.
3.  **Mock Mode:** A simple placeholder that returns randomized data. This is useful for frontend UI testing when a real analysis is not needed.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   Node.js (v18 or later recommended)
-   MongoDB (A local instance or a free MongoDB Atlas cluster URI)

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
    -   Run the master installation script, which installs dependencies for both the server and the client:
    ```bash
    npm install concurrently && npm run install-all
    ```

### Running the Application

1.  From the **root `kazimatch/` directory**, run the development server:
    ```bash
    npm run dev
    ```
2.  This command will start both the backend server (on `http://localhost:5000`) and the frontend Vite server (on the port specified in `client/vite.config.js`).

3.  Open your browser and navigate to the frontend URL to use the application.


## DEPLOYMENT

### Client: https://kazi-match.vercel.app

### Server: https://kazimatch.onrender.com
