const express = require('express');
const request = require('request');

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

///bypass?url=https://joke-api-strict-cors.appspot.com/jokes/random
///bypass?url=PUT-API-URL-HERE
app.get('/bypass', (req, res) => {
  request(
    { url: req.query.url },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
