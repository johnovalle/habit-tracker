const Habit = require('../models').Habit;

module.exports = {
  create(req, res) {
    return Habit
      .create({
        title: req.body.title,
        habitGroupId: req.params.habitGroupId,
      })
      .then(habit => res.status(201).send(habit))
      .catch(error => req.status(400).send(error));
  },
  update(req, res) {
    return Habit
      .find({
        where: {
          habitGroupId: req.params.habitGroupId,
          id: req.params.habitId,
        },
        attributes: ['id', 'habitGroupId', 'title', 'createdAt', 'updatedAt'],
      })
      .then(habit => {
        if (!habit) {
          return res.status(404).send({
            message: "Habit not found"
          });
        }

        return habit
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedHabit => res.send(200).send(updatedHabit))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Habit
      .find({
        where: {
          habitGroupId: req.params.habitGroupId,
          id: req.params.habitId,
        },
        attributes: ['id', 'habitGroupId', 'title', 'createdAt', 'updatedAt'],
      })
      .then(habit => {
        if (!habit) {
          return res.status(404).send({
            message: "Habit not found"
          });
        }
        return habit
          .destroy()
          .then(() => res.status(200).send({message: "Deleted Habit"})) //status 204 no message
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

