const express = require('express');
const app = express();

app.use(express.static('./'));
app.use(express.static('dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});

app.post('/api/login', (req, res) => {
  console.log('ss');
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});