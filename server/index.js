import express from 'express';
import {PORT} from "./config.js";
import routes from './routes/index.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());
app.use(routes);
app.listen(PORT);
console.log(`Server is runnig on port ${PORT}`);