require('dotenv').config();

import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Worldi!');
});

app.get('/about/:username', (req, res) => {
  res.json({
    message: `about page! Hello ${req.params.username}`,
    query: req.query,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
