#!/bin/bash

# Creates root-level configuration files
touch .env .gitignore README.md

# --- Backend Setup ---
mkdir -p server
cd server

# Creates core backend directories
mkdir -p config controllers middleware models routes services

# Creates server entry file
touch server.js

# Creates backend files based on the project plan
touch config/db.js

touch middleware/authMiddleware.js
touch middleware/errorMiddleware.js

touch models/userModel.js
touch models/jobModel.js
touch models/applicationModel.js
touch models/matchModel.js

touch controllers/authController.js
touch controllers/jobController.js
touch controllers/applicationController.js
touch controllers/userController.js

touch routes/authRoutes.js
touch routes/jobRoutes.js
touch routes/applicationRoutes.js
touch routes/userRoutes.js

touch services/aiMatchingService.js

# Returns to the root directory
cd ..

# --- Frontend Setup ---
mkdir -p client
cd client

# Creates public and src directories
mkdir -p public src

# Creates base file in public
touch public/index.html

# Creates core frontend directories within src
mkdir -p src/api src/assets/css src/components src/context src/hooks src/pages

# Creates client entry files
touch src/App.js src/index.js

# Creates frontend files based on the project plan
touch src/api/authApi.js
touch src/api/jobApi.js
touch src/api/applicationApi.js

mkdir -p src/components/common src/components/dashboard src/components/jobs src/components/layout

touch src/components/common/PrivateRoute.js
touch src/components/common/Spinner.js
touch src/components/layout/Navbar.js
touch src/components/layout/Footer.js
touch src/components/jobs/JobCard.js
touch src/components/jobs/JobFilter.js
touch src/components/dashboard/ApplicantCard.js

touch src/context/AuthContext.js

touch src/hooks/useAuth.js

touch src/pages/HomePage.js
touch src/pages/JobsPage.js
touch src/pages/JobDetailsPage.js
touch src/pages/LoginPage.js
touch src/pages/RegisterPage.js
touch src/pages/EmployerDashboardPage.js
touch src/pages/ApplicantsPage.js
touch src/pages/SeekerDashboardPage.js
touch src/pages/NotFoundPage.js

# Returns to the root directory
cd ..

echo "KaziMatch project structure created successfully."
