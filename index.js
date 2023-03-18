const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.get('/getData', (req, res) => {
  const url = Buffer.from(req.query.url, 'base64').toString('utf-8');
  const headers = { ...req.headers };
  delete headers.host;
  headers['accept-encoding'] = 'identity';
  console.log(`Start fetching data from ${url} ....`);
  request.get({url, headers}, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    } else {
      const headers = { ...response.headers };
      delete headers['content-encoding'];
      res.set(headers).send(body);
    }
  });
});

app.post('/getData', (req, res) => {
  const url = Buffer.from(req.query.url, 'base64').toString('utf-8');
  const headers = { ...req.headers };
  delete headers.host;
  headers['accept-encoding'] = 'identity';
  const body = req.body;

  request.post({ url, headers, json: body }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    } else {
      const headers = { ...response.headers };
      delete headers['content-encoding'];
      res.set(headers).send(body);
    }
  });
});

app.listen(port, () => {
  console.log('GetData API listening on port 3000!');
});
