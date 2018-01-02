import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(logger('dev'));
app.use(bodyParser.json());
app.user(bodyParser.urlencoded({ extended: false}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../src/index'));
});

app.listen(port, () => {
  console.log(`habit-tracker listening on port: ${port}`);
})
