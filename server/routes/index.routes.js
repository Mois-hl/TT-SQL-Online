import {Router} from 'express'
import { 
    executeQuery, 
    finishApp, 
    initializeApp 
} from '../controller/index.controller.js';

const router = Router();

router.get('/query', executeQuery);

router.get('/init', initializeApp);

router.get('/close', finishApp);

export default router;