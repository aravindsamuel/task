Task – Construction Website & Authentication System

📌 Overview
This project contains two case studies:
Construction Company Website – built using React (Vite) + Tailwind CSS.
Simple Authentication System – built using Node.js + Express.js.

The repository is structured as:
task/
│
├── backend/      # Node.js + Express.js authentication system
├── frontend/     # React (Vite) + Tailwind CSS construction website
└── README.md


🛠 Tech Stack

Frontend
React.js (Vite)
React Router
Tailwind CSS

Backend
Node.js
Express.js
Nodemailer (for simulated confirmation email)
bcrypt (for password hashing)
JSON Web Token (JWT)

📂 Project Structure
task/
│
├── backend/
│   ├── src/                # Server source code
│   ├── .env                # Environment variables (not committed to git)
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/             # Public assets
│   ├── src/                # React components
│   ├── index.html
│   ├── package.json
│   └── .gitignore

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/aravindsamuel/task.git
cd task

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside /backend and give the credentials respectively
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=   
DB_USER=
DB_PASS=
JWT_SECRET=
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey           
SMTP_PASS=
EMAIL_FROM=
APP_URL=http://localhost:5173
API_URL=http://localhost:5000


Run backend
npm start
Backend will run on http://localhost:5000


3️⃣ Frontend Setup
cd ../frontend
npm install

Run frontend
npm run dev
Frontend will run on http://localhost:5173 (default Vite port)


🚀 Features

Case Study 1: Construction Company Website
Responsive design for desktop & mobile
Company introduction
Services section
Contact form (sends data to backend API)

Case Study 2: Simple Authentication System
Sign Up with email & password
Sign In with validation
Forgot Password flow
Confirmation email (simulated via console or Nodemailer)
JWT-based protected routes


📌 API Endpoints

Auth
POST /api/auth/signup – Create a new account
POST /api/auth/login – Authenticate user
POST /api/auth/forgot-password – Send password reset link
GET / – Access protected content (JWT required)



🖼 Screenshots
<img width="1884" height="961" alt="image" src="https://github.com/user-attachments/assets/0ab0bf8e-5c2e-4b06-85b2-65b5dea994e4" />
<img width="1908" height="895" alt="image" src="https://github.com/user-attachments/assets/b7f56e4b-393c-492a-bc5c-5963861e739c" />
<img width="1901" height="958" alt="image" src="https://github.com/user-attachments/assets/29b8c790-e04d-4fea-8514-98e915323896" />
<img width="1920" height="2657" alt="screencapture-localhost-5173-2025-08-15-00_27_27" src="https://github.com/user-attachments/assets/55408c43-7127-4067-8d59-5f96ea4feea2" />



📜 License
This project is for task purpose.
