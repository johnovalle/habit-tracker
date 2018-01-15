import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import knexBase from 'knex';

let dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../habit.sqlite')
  }
}

const knex = knexBase(dbConfig);
knex.select('id', 'title').from("habits").timeout(1000).asCallback((err, rows) => {
  if (err) { console.log(err); }
  else {
    console.log(rows);
  }
});

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.set('view engine', 'ejs');

//require('./routes')(app);
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '../src/index'));
});

app.listen(port, () => {
  console.log(`habit-tracker listening on port: ${port}`);
})
