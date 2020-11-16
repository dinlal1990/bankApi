import express from 'express';

import {siginUser} from '../controllers/usersController';

const router = express.Router();

// users Routes


router.post('/auth/signin', siginUser);


export default router;
