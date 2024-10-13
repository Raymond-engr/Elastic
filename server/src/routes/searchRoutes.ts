import express, { Router } from 'express';
import { getSearch } from '../controllers/getSearch';

const router: Router = express.Router();

router.route('/')
  .get(getSearch)
  

export default router;