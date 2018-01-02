const habitGroupsController = require('../controllers').habitGroups;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Habit API up'
  }));

  app.post('/api/habitgroups', habitGroupsController.create);
}
