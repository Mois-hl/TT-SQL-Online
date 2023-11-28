import {Router} from 'express'
import { 
    executeQuery, 
    finishApp, 
    initializeApp,
    resetApp
} from '../controller/index.controller.js';

const router = Router();

router.get('/query', executeQuery);

router.get('/init', initializeApp);

router.get('/close', finishApp);

router.get('/reset', resetApp);

export default router;