import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});