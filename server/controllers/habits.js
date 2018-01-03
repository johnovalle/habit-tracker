const Habit = require('../models').Habit;

module.exports = {
  create(req, res) {
    return Habit
      .create({
        title: req.body.title
      })
      .then(habit => res.status(201).send(habit))
      .catch(error => req.status(400).send(error));
  },
};

