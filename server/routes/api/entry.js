const express = require('express');
const router = express.Router();
const db = require('../../db');

const normalize = ['id', {habitId: 'habit_id', date: 'created_at'}];

router.get('/', (req, res) => {
  db('entry').select(normalize).then(data => {
    res.send(data);
  });
});

router.post('/', (req, res) => {
  db('entry').insert({
    habit_id: req.body.habitId,
    created_at: req.body.date,
  })
  .returning(normalize)
  .then(data => res.send(data[0]))
  .catch(err => res.send(err));
});

router.delete('/:id', (req, res) => {
  db('entry').where({id: req.params.id}).del().then(() => {
    res.status(200).send('entry deleted');
  });
});

module.exports = router;
