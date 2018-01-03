const habitGroupsController = require('../controllers').habitGroups;
const habitsController = require('../controllers').habit;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Habit API up'
  }));

  app.post('/api/habitgroups', habitGroupsController.create);
  app.get('/api/habitgroups', habitGroupsController.list);

  app.post('/api/habitgroups/:habitGroupId/habits', habitsController.create);
}
