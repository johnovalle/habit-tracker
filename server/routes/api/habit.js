const express = require('express');
const router = express.Router();
const db = require('../../db');

const normalize = ['id', 'title', 'priority', {groupId: 'group_id'}];

router.get('/', (req, res) => {
  db('habit').select(normalize).then(data => {
    res.send(data);
  });
});

router.get('/group/:groupId', (req, res) => {
  db('habit').where({group_id:  req.params.groupId}).select(normalize).then(data => {
    res.send(data);
  });
});

router.get('/:id', (req, res) => {
  db('habit').where({id: req.params.id}).select(normalize).then(data => {
    res.send(data[0]);
  });
});

router.post('/', (req, res) => {
  if (req.body.title && req.body.priority > -1) {
    db('habit').insert({
      title: req.body.title,
      priority: req.body.priority,
      group_id: req.body.groupId,
    }).returning(normalize).then(data => {
      res.send(data);
    });
  } else {
    res.status(500).send('Either title or priority is invalid');
  }
});

router.put('/:id', (req, res) => {
  if (req.body.title && req.body.priority > -1) {
    db('habit').where({id: req.params.id}).update({
      title: req.body.title,
      priority: req.body.priority,
      group_id: req.body.groupId || null,
    }).returning(normalize).then(data => {
      res.send(data[0]);
    });
  } else {
    res.status(500).send('Either title or priority is invalid');
  }
});

router.patch('/:id', (req, res) => {
  db('habit').where({id: req.params.id}).update(req.body).returning('*').then(data => {
    res.send(data[0]);
  }).catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  db('habit').where({id: req.params.id}).del().then(() => {
    res.status(200).send('habit deleted');
  });
});



module.exports = router;
