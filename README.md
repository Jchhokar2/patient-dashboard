# Patient Dashboard

A full-stack web app I built for managing patient records. It lets staff view, add, and manage patients with a live dashboard showing stats and charts.

## Tech Stack

- **Frontend:** Angular 21, PrimeNG, Chart.js
- **Backend:** Node.js 24, Express.js, TypeScript 5.9
- **Database:** MongoDB Atlas

## How to Run This Project

### Step 1 — Clone the repo

    git clone https://github.com/Jchhokar2/patient-dashboard.git
    cd patient-dashboard

### Step 2 — Set up the Backend

    cd backend
    npm install

Create a `.env` file inside the `backend` folder and paste this exactly:

    MONGODB_URI=mongodb+srv://jasrajchhokar2003_db_user:UXWPeIGm6mCOAwzR@cluster0.1nwaaso.mongodb.net/patient-dashboard?appName=Cluster0
    PORT=3000

Start the backend:

    npm run dev

You should see `Connected to MongoDB` and `Server running on port 3000`.

### Step 3 — Set up the Frontend

Open a new terminal tab and run:

    cd frontend
    npm install
    ng serve

Open your browser and go to `http://localhost:4200`

## What the App Does

- Dashboard page showing total, active, pending, and inactive patient counts
- Pie chart breaking down patient statuses
- Patient table with search by name or email and filter by status
- Pagination — 10 patients per page
- Add Patient form with full validation
- Patient detail page where you can update a patient's status
- Loading spinners on every API call
- Error toasts if anything goes wrong

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/patients | Get all patients (supports search, status, page, pageSize) |
| GET | /api/patients/:id | Get a single patient |
| POST | /api/patients | Create a new patient |
| PUT | /api/patients/:id | Update patient status |
| GET | /api/stats | Get dashboard stats |

## Notes

- The database is already seeded with 20 patients so you will see data right away
- No need to create your own MongoDB account — the connection string above connects to my Atlas cluster
- Make sure both the backend and frontend are running at the same time