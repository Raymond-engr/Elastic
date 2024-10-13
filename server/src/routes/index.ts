import express, { Router } from 'express';
import searchRoutes from './searchRoutes';

const router: Router = express.Router();

router.use('/search', searchRoutes);

export default router;