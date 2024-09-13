const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const maps = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    maps.push({
      "mapId": i,
      "name": faker.location.city(),
      "description": faker.lorem.paragraph(),
      "image": faker.image.url(),
      "price": parseInt(faker.commerce.price(), 10),
      "url": `http://localhost:3000/maps/${i}`,
    });
  }
  res.json(maps);
});

router.get('/filter', (req, res) => {
  const { filter } = req.query;
  res.json({
    filter,
  });
});

router.get('/:mapId', (req, res) => {
  const { mapId } = req.params;
  res.json({
    map: {
      mapId,
      "name": "map1",
      "url": "http://localhost:3000/map1",
      "datasets": ["http://localhost:3000/dataset1", "http://localhost:3000/dataset2"],
    },
  });
});

router.get('/:mapId/datasets/:datasetId', (req, res) => {
  const { mapId, datasetId } = req.params;
  res.json({
    mapId,
    datasets: [
      datasetId, {"name": "dataset1", "url": "http://localhost:3000/dataset1"},
      datasetId, {"name": "dataset2", "url": "http://localhost:3000/dataset2"},
    ],
  });
});

module.exports = router;
