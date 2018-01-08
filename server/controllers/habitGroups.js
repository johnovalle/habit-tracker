const HabitGroup = require('../models').HabitGroup;
const Habit = require('../models').Habit;

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
      .findAll({
        attributes: ['id', 'title', 'createdAt', 'updatedAt'],
        include: [{
          model: Habit,
          as: 'habits',
          attributes: ['id', 'title'],
        }],
      })
      //.all({attributes: ['id', 'title', 'createdAt', 'updatedAt']}) //for some reason by default it looks to a column 'allowNull' which does not exist
      .then(habitGroups => res.status(200).send(habitGroups))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return HabitGroup
      .findById(req.params.habitGroupId, {
        attributes: ['id', 'title', 'createdAt', 'updatedAt'],
        include: [{
          model: Habit,
          as: 'habits',
          attributes: ['id', 'title'],
        }],
      })
      .then(habitGroup => {
        if (!habitGroup) {
          return res.status(400).send({
            message: 'Habit Group Not Found',
          });
        }
        res.status(200).send(habitGroup)
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return HabitGroup
      .findById(req.params.habitGroupId, {
        attributes: ['id', 'title', 'createdAt', 'updatedAt'],
        include: [{
          model: Habit,
          as: 'habits',
          attributes: ['id', 'title'],
        }],
      })
      .then(habitGroup => {
        if (!habitGroup) {
          return res.status(400).send({
            message: 'Habit Group Not Found',
          });
        }
        return habitGroup
          .update({
            title: req.body.title || habitGroup.title,
          })
          .then(() => res.status(200).send(habitGroup))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return HabitGroup
      .findById(req.params.habitGroupId, {
        attributes: ['id', 'title', 'createdAt', 'updatedAt'],
      })
      .then(habitGroup => {
        if (!habitGroup) {
          return res.status(400).send({
            message: 'Habit Group Not Found',
          });
        }
        return habitGroup
          .destroy()
          .then(() => res.status(200).send({ message: 'Habit group deleted successfully.'})) //status 204
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
}
