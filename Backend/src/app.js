import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import passport from './utils/passport.js';

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_PRODUCTION,
  process.env.CORS_ORIGIN_DEV,
];

app.use(
  cors({
    origin:
      process.env.MODE === 'production' ? allowedOrigins[0] : allowedOrigins[1],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));
// passport(app);

//routes declaration
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import likeRoutes from './routes/like.route.js';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/toggle-like', likeRoutes);

export { app };
