const HabitGroup = require('../models').HabitGroup;

module.exports = {
  create(req, res) {
    return HabitGroup
      .create({
        title: req.body.title
      })
      .then(habitGroup => res.status(201).send(habitGroup))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return HabitGroup
      .all({attributes: ['id', 'title', 'createdAt', 'updatedAt']}) //for some reason by default it looks to a column 'allowNull' which does not exist
      .then(habitGroups => res.status(200).send(habitGroups))
      .catch(error => res.status(400).send(error));
  }
}
