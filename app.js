const express = require('express')
const bodyParser = require('body-parser');
const sslChecker = require('ssl-checker').default

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/layout', express.static('layout'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/check', async (req, res) => {

  const info = await sslChecker(req.body.domain, { method: "GET", port: 443 });
  
  res.send({ domain: req.body.domain, ...info});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
