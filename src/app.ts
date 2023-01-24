import express, { Router } from 'express';
import Controller from './resource/Controller';
import multer from 'multer';

const app = express();
const router = Router();
const multerConfig = multer();

app.use(express.json());

router.post('/api/createCsv', Controller.CreateCsv);
router.post('/api/readCsv', multerConfig.single('file'), Controller.ReadCsv);

app.use(router);

export { app };
