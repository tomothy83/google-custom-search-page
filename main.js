const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.listen(port, () => {
  console.log(`Running at Port ${port}...`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendStatus(404);
});
