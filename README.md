# student-scholarship-portal
# State-Level Student Scholarship Portal

## Project Overview

A frontend-only React.js web application simulating a state-level student scholarship management system, modeled on a Tamil Nadu government scholarship portal. The project supports two roles — **Student** and **Officer** — each with a fully separate dashboard, protected routes, and role-specific functionality. All data is handled with mock services and `localStorage`; there is no backend or database.

This project was built incrementally as a portfolio/learning project covering authentication, protected routing, multi-step forms, CRM-style data tables, and role-based access control (RBAC) entirely on the frontend.

## Key Features

**Student Portal**
- Mock registration and login
- Multi-section profile management (personal, academic, family, category, disability, location, bank) with completion tracking
- Scholarship Opportunity Calendar (calendar and list views) with Open/Upcoming/Closed status
- Document Expiry Tracker with file upload (PDF/JPG/PNG), Valid/Expiring Soon/Expired status
- Dedicated Scholarships browsing page with search and filters
- 2-step scholarship application flow (profile confirmation → document checklist → submit)
- My Applications and Application Journey timeline with award details for approved applications

**Officer Portal**
- CRM-style dashboard (Total / Pending / Approved / Rejected applications)
- Application management with search, filter (status, scholarship, category), sort, and pagination
- Application review with document checklist, comments, and Approve/Reject actions
- Applications submitted by students automatically appear in the Officer CRM in real time

**Platform**
- Role-based route protection (`student` vs `officer`) with automatic redirects for unauthorized access
- Consistent mock API layer using Axios-based request simulation
- Fully responsive layout for mobile, tablet, and desktop

## Tech Stack

- React.js (JavaScript)
- React Router
- Tailwind CSS
- Axios (mock API layer)
- Mock data + `localStorage` (no backend or database)
- Vite

## Setup & Run Instructions

```bash
# 1. Clone the repository
git clone <https://github.com/SobiKannu23/student-scholarship-portal.git>
cd student-scholarship-portal

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open the app
# Visit the URL shown in the terminal (typically http://localhost:5173)
```

## Project Structure
src/
├── config/ # Sidebar navigation link definitions per role
├── data/ # All mock data (users, profiles, scholarships, documents, applications)
├── utils/ # Pure helper functions (dates, status calculation, validation)
├── services/ # Mock API layer (Axios-based) — one service per domain
├── hooks/ # Shared React hooks (e.g. useStudentProfile)
├── context/ # AuthContext — session/auth state
├── components/ # Reusable UI building blocks (Button, Card, Layout, forms, etc.)
└── pages/ # Route-level page components (Student and Officer)


## Mock Credentials

| Role    | Email                          | Password     |
|---------|---------------------------------|--------------|
| Student | arun.kumar@example.com          | student123   |
| Officer | priya.raman@tn.gov.in           | officer123   |

New student accounts can also be created via the **Register** page; officer accounts are fixed/seeded only.

## Role Switcher Instructions

This project does not include an in-app role switcher toggle — role is determined entirely by which mock account you log in with.

To test both roles:

1. **Log out** of the current session using the **Logout** button in the navbar (this clears the stored session).
2. On the **Login** page, sign in using either:
   - the **Student** credentials above → redirects to `/student/dashboard`, or
   - the **Officer** credentials above → redirects to `/officer/dashboard`
3. Route protection ensures a Student account cannot access any `/officer/*` route (and vice versa) — attempting to do so redirects back to that role's own dashboard.
4. To test student → officer application visibility, submit an application while logged in as Student, then log out and log back in as Officer to view it under **Applications**.
