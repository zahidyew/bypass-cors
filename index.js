const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

  let whitelisted = ['http://127.0.0.1:5500', 'https://zahidyew.github.io'];
  let origin = req.headers.origin;

  if (whitelisted.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});

// .../bypass?url=URL-HERE
app.get('/bypass', (req, res) => {
  fetch(req.query.url, {method: 'GET'})
    .then(response => response.text())
    .then(body => res.json(JSON.parse(body)))
    .catch(error => console.log(error))
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));