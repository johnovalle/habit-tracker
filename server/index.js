const express = require('express');
const api = require('./routes/api');
const authRoutes = require('./routes/auth/auth');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('../webpack.config');

const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/auth', authRoutes);

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../client/index'));
});

app.listen(8000);

module.exports = app;
