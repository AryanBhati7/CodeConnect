import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN_PRODUCTION,
  process.env.CORS_ORIGIN_DEV,
];

app.use(
  cors({
    origin: '*',
    // origin: (origin, callback) => {
    //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

//routes declaration
import authRoutes from './routes/auth.route.js';

app.use('/api/auth', authRoutes);

export { app };
