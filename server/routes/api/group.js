const express = require('express');
const Promise = require('bluebird');
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
      res.send(data[0]);
    });
});

router.patch('/:id', (req, res) => {
  db('habit_group').where({id: req.params.id}).update(req.body).returning('*').then(data => {
    res.send(data[0]);
  }).catch(err => console.log(err));
});

router.put('/', (req, res) => {
  //console.log(req.body);
  //res.send('okay');
  db.transaction(trx => {
    const queries = [];
    req.body.groups.forEach(group => {
      const query = db('habit_group')
        .where({id: group.id})
        .update({priority: group.priority})
        .transacting(trx);
      queries.push(query);
    });

    Promise.all(queries)
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then(data => {
    console.log(data);
    res.send(data);
  })
  .catch(err => {
    console.log(err);
  })
});

router.delete('/:id', (req, res) => {
  db('habit_group').where({id: req.params.id}).del().then(() => {
    res.status(200).send('group deleted');
  });
})

module.exports = router;
