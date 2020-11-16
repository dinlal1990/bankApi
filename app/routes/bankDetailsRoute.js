import express from 'express';

import bankDetails from '../controllers/bankDetailsController';

const router = express.Router();

// users Routes


router.get('/auth/bank', bankDetails);


export default router;
