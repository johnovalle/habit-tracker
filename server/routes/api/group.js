const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', (req, res) => {
  db('habit_group').select().then(data => {
    res.send(data);
  });
});

router.get('/:id', (req, res) => {
  db('habit_group').where({id: req.params.id}).select().then(data => {
    res.send(data[0]);
  });
});

router.post('/', (req, res) => {
  db('habit_group').insert(req.body).returning('*').then(data => {
    res.send(data[0]);
  });
});

router.put('/:id', (req, res) => {
  db('habit_group').where({id: req.params.id})
                  .update({
      title: req.body.title || null,
      priority: req.body.priority || null,
    })
    .returning('*').then(data => {
      res.send(data);
    });
});

router.patch('/:id', (req, res) => {
  db('habit_group').where({id: req.params.id}).update(req.body).returning('*').then(data => {
      res.send(data);
  });
});

module.exports = router;
