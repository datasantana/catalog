const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Map catalog');
});

app.get('/maps', (req, res) => {
  res.json({
    maps: [
      {"name": "map1", "url": "http://localhost:3000/map1", "datasets": ["http://localhost:3000/dataset1", "http://localhost:3000/dataset2"]},
      {"name": "map2", "url": "http://localhost:3000/map2", "datasets": ["http://localhost:3000/dataset2", "http://localhost:3000/dataset3"]},
      {"name": "map3", "url": "http://localhost:3000/map3", "datasets": ["http://localhost:3000/dataset1", "http://localhost:3000/dataset3"]},
    ],
  });
});

app.get('/maps/:mapId', (req, res) => {
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

app.get('/maps/:mapId/datasets/:datasetId', (req, res) => {
  const { mapId, datasetId } = req.params;
  res.json({
    mapId,
    datasets: [
      datasetId, {"name": "dataset1", "url": "http://localhost:3000/dataset1"},
      datasetId, {"name": "dataset2", "url": "http://localhost:3000/dataset2"},
    ],
  });
});

// sepecific paths should be defined before dynamic paths
app.get('/datasets/filter', (req, res) => {
  const { filter } = req.query;
  res.json({
    filter,
  });
});

app.get('/datasets', (req, res) => {
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

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No limit or offset passed');
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
