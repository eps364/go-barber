import express from 'express';
import uploadConfig from './config/upload'

import cors from 'cors';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(cors());
app.use(routes);

export default app;
