const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// sepecific paths should be defined before dynamic paths
// for example, /datasets/filter should be defined before /datasets/:datasetId
router.get('/', (req, res) => {
  const datasets = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    datasets.push({
      "datasetId": i,
      "name": faker.location.city(),
      "description": faker.lorem.paragraph(),
      "image": faker.image.url(),
      "price": parseInt(faker.commerce.price(), 10),
      "url": `http://localhost:3000/datasets/${i}`,
    });
  }
  res.json(datasets);
});

router.get('/filter', (req, res) => {
  const { filter } = req.query;
  res.json({
    filter,
  });
});

router.get('/:datasetId', (req, res) => {
  const { datasetId } = req.params;
  res.json({
    dataset: {
      datasetId,
      "name": "dataset1",
      "url": "http://localhost:3000/dataset1",
    },
  });
});

module.exports = router;
