import express, { Router } from 'express';
import Controller from './resource/Controller';

const app = express();
const router = Router();

app.use(express.json());
router.get('/api/createCsv', Controller.CreateCsv);

app.use(router);

export { app };
