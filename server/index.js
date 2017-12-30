import express from 'express';

const port = 3000;
const app = express();


app.get('/', (req, res) => {
  res.send("page loaded");
});

app.listen(port, () => {
  console.log(`habit-tracker listening on port: ${port}`);
})
