const express = require('express');
const request = require('request');
const app = express();

app.get('/getData', (req, res) => {
  const url = Buffer.from(req.query.url, 'base64').toString('utf-8');
  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    } else {
      res.send(body);
    }
  });
});

app.listen(3000, () => {
  console.log('GetData API listening on port 3000!');
});
