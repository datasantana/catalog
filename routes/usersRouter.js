const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

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
  const users = [];
  const { size } = req.query;
  const limit = size || 100;
  for (let i = 0; i < limit; i++) {
    users.push({
      "userId": i,
      "name": faker.person.fullName(),
      "email": faker.internet.email(),
      "image": faker.image.avatar(),
      "url": `http://localhost:3000/users/${i}`,
    });
  }
  res.json(users);
});

router.get('/filter', (req, res) => {
  const { filter } = req.query;
  res.json({
    filter,
  });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    user: {
      userId,
      "name": "user1",
      "url": "http://localhost:3000/user1",
    },
  });
});

module.exports = router;
