// Import Routers
import { port } from '@config/env';
import routes from '@routes/index';
// Other imports
import cors from 'cors';
import express, { Application, json, urlencoded } from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import { resolve } from 'path';

// Initializations
const app: Application = express();

// Settings
app.set('port', port);

// Middlewares
app.use(json({ limit: '2mb' }));
app.use(urlencoded({ extended: true, limit: '2mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use(
  fileUpload({
    tempFileDir: './images',
    useTempFiles: true,
    limits: { fileSize: 2 * 1024 * 1024 },
  }),
);

// Routers
routes(app);

// static files
const path = resolve(__dirname, '../build');
app.use('/images', express.static(resolve(__dirname, '../images')));
app.use(express.static(path));
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../build/index.html'));
});

export default app;
