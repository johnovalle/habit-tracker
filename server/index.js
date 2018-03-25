const express = require('express');
const api = require('./routes/api');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// app.get('/', (req, res) => {
//   res.send("Hello Felix");
// });

app.listen(8000);
