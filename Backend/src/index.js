import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import { app } from './app.js';
import connectDB from './db/index.js';

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🌐 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });

app.get('/', (req, res) => {
  res.send('CodeConnect Backend Test');
});
