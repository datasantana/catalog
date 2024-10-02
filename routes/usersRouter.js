const express = require('express');
const usersService = require('../services/usersService');
const router = express.Router();
const service = new usersService();

//router.get('/', (req, res) => {
//  const { limit, offset } = req.query;
//  if (limit && offset) {
//    res.json({
//      limit,
//      offset,
//    });
//  } else {
//    res.send('No limit or offset passed');
//  }
//});

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

// router.get('/filter', (req, res) => {
//   const { filter } = req.query;
//   res.json({
//     filter,
//   });
// });

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = service.findById(userId);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const updatedUser = service.update(userId, body);
  res.json(updatedUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const deletedUser = service.delete(userId);
  res.json(deletedUser);
});

module.exports = router;
