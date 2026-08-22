import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { admin } from './config/firebaseAdmin';
import { errorMiddleware } from './middleware/errorMiddleware';

// Route Imports
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import skillRoutes from './routes/skillRoutes';
import courseRoutes from './routes/courseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import projectRoutes from './routes/projectRoutes';
import achievementRoutes from './routes/achievementRoutes';
import notificationRoutes from './routes/notificationRoutes';
import activityRoutes from './routes/activityRoutes';
import talentRoutes from './routes/talentRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. CORS configuration (allow local ports)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, true); // Allow on dev fallback
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Logger Middleware (Morgan)
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 4. Rate Limiter (Limit requests from same IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  }
});
app.use('/api', limiter);

// 5. Request Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 6. Base Routes
app.get('/', (req, res) => {
  return res.status(200).json({
    name: 'THENAM Skills API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    status: 'Operational'
  });
});

// Health check endpoint (Firestore verified)
app.get('/api/health', async (req, res) => {
  try {
    const db = admin.firestore();
    // Quick test read against Firestore
    await db.collection('skills').limit(1).get();
    return res.status(200).json({
      success: true,
      server: "THENAM Skills API",
      database: "firebase",
      authentication: "firebase",
      environment: env.NODE_ENV
    });
  } catch (error) {
    console.error('Health check Firestore database error:', error);
    return res.status(200).json({
      success: true,
      server: "THENAM Skills API",
      database: "error",
      authentication: "firebase",
      environment: env.NODE_ENV
    });
  }
});

// 7. Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/admin', adminRoutes);

// 8. 404 Route Not Found handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API Route Not Found: ${req.originalUrl}`
  });
});

// 9. Global Exception Middleware
app.use(errorMiddleware);

export { app };
export default app;
