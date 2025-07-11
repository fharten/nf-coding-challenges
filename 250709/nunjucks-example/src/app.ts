require('dotenv').config();

import express from 'express';
import type { Request, Response } from 'express';
import nunjucks from 'nunjucks';
import cors from 'cors';
import { logger } from './middlewares/loggerMiddleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(cors());

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
});

app.get('/', (req: Request, res: Response) => {
  res.render('home.html', {
    title: 'Nunjucks Example',
  });
});

app.get('/about', (req: Request, res: Response) => {
  res.render('about.html', {
    title: 'About page',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
