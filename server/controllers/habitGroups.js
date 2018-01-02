const HabitGroup = require('../models').HabitGroup;

module.exports = {
  create(req, res) {
    return HabitGroup
      .create({
        title: req.body.title
      })
      .then(habitGroup => res.status(201).send(habitGroup))
      .catch(error => res.status(400).send(error));
  }
}
