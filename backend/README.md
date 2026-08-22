# THENAM Skills Backend API Service

This is the production-ready Node.js, Express, TypeScript, and MongoDB Atlas backend database service for the **THENAM SKILLS** application. It validates and stores profile data, manages course catalogs, processes enrollments, and transactionally issues tamper-proof academic credentials.

## Technology Stack

* **Runtime**: Node.js (v18+)
* **Framework**: Express.js with TypeScript
* **Database**: MongoDB Atlas (via Mongoose ORM)
* **Identity Management**: Firebase Admin SDK (Google Token Authorization)
* **Security & Traffic Control**: Helmet, CORS, Express Rate Limiter
* **Input Validation**: Zod Schema Checks

---

## Directory Structure

```
backend/
├── src/
│   ├── config/          # Database, Firebase Admin, Environment loaders
│   ├── controllers/     # API route handlers
│   ├── middleware/      # Auth Token verification, Role protection, Global errors
│   ├── models/          # Mongoose Schemas (User, Course, Certificate, etc.)
│   ├── routes/          # REST route declarations
│   ├── seed/            # Skills catalog and courses seed scripts
│   ├── utils/           # Async handler wrapper, custom API JSON responders
│   └── validations/     # Zod request validators
├── tsconfig.json
├── package.json
└── README.md
```

---

## Getting Started

### 1. Installation
Navigate to the backend directory and install dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file inside the `backend/` directory matching the contract shown in `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/thenam_skills?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000

# Firebase Admin credentials (obtained from Project Settings -> Service Accounts in Firebase Console)
FIREBASE_PROJECT_ID=thenamskills
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@thenamskills.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### 3. Seed Database Taxonomy
Run the seeders to populate the skills taxonomy and course catalog:
```bash
npm run seed
```

### 4. Launch Development Server
Start the Express server locally:
```bash
npm run dev
```
The API server will listen on `http://localhost:5000`.

---

## API Endpoints Reference

### Public API Routes
* `GET /` - Root status report
* `GET /api/health` - Health report verifying MongoDB connection state
* `GET /api/certificates/verify/:verificationCode` - Cryptographic credential verification (safe return)

### Authenticated Student Routes (`Authorization: Bearer <firebase_id_token>`)
* `POST /api/auth/sync` - Syncs Google/Firebase session to MongoDB User profiles
* `GET /api/auth/me` - Retrives own authenticated MongoDB profile
* `POST /api/profile` - Completes student onboarding (sets `profileCompleted: true`)
* `PUT /api/profile/me` - Edits student profile demographics (checks age, sanitizes inputs)
* `GET /api/profile/:firebaseUid` - Retrieves public student profile portfolio
* `GET /api/skills` - Search/Browse skills catalog
* `GET /api/courses` - Search/Browse courses
* `POST /api/courses/:id/enroll` - Enrolls in a course
* `PUT /api/courses/:id/progress` - Log course progress (0-100%)
* `POST /api/courses/:id/complete` - Transaction completion (increments metrics, issues certificate, updates XP points)
* `GET /api/certificates/me` - Retrieves own earned certificates
* `GET /api/projects/me` - View own portfolio projects
* `POST /api/projects` - Create project
* `PUT /api/projects/:id` - Edit project
* `DELETE /api/projects/:id` - Delete project
* `GET /api/notifications` - Retrieve list of notifications
* `PATCH /api/notifications/:id/read` - Mark notification as read
* `GET /api/talent` - Talent Hub public directory search with dynamic filters

### Administrative Console Routes (Requires `admin` role)
* `GET /api/admin/users` - List all users in system
* `PATCH /api/admin/users/:id/role` - Modify user role (`faculty`, `student`, `admin`, `recruiter`)
* `DELETE /api/admin/users/:id` - Permanently deletes user and clean sweeps all references
* `GET /api/admin/statistics` - Aggregate system metrics dashboard
