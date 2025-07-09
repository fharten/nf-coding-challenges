require('dotenv').config();

import express from 'express';
import cors from 'cors';
import randomcolor from 'randomcolor';
import convert from 'color-convert';
import compliColor from 'complimentary-color';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/color', (req, res) => {
  const hex = randomcolor();
  const rgb = convert.hex.rgb(hex);
  const hsl = convert.hex.hsl(hex);
  const complementary = compliColor.process(hex);

  res.json({
    HEX: hex,
    RGB: rgb.toString(),
    HSL: hsl.toString(),
    complementary: complementary.toString(),
  });
});

app.get('/color/:color', (req, res) => {
  const hex = randomcolor({ hue: req.params.color });
  const rgb = convert.hex.rgb(hex);
  const hsl = convert.hex.hsl(hex);
  const complementary = compliColor.process(hex);

  res.json({
    HEX: hex,
    RGB: rgb.toString(),
    HSL: hsl.toString(),
    complementary: complementary.toString(),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
