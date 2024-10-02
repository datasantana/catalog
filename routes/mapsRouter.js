const express = require('express');
const { faker } = require('@faker-js/faker');
const mapsService = require('../services/mapsService');
const router = express.Router();
const service = new mapsService();

router.get('/', (req, res) => {
  const maps = service.find();
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
  const map = service.findById(mapId);
  res.json(map);
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

router.post('/', (req, res) => {
  const body = req.body;
  const newMap = service.create(body);
  res.status(201).json(newMap);
});

router.patch('/:mapId', (req, res) => {
  const { mapId } = req.params;
  const body = req.body;
  const updatedMap = service.update(mapId, body);
  res.json(updatedMap);
});

router.put('/:mapId', (req, res) => {
  const { mapId } = req.params;
  const body = req.body;
  res.json({
    message: 'Map replaced',
    mapId,
    map: body,
  });
});

router.delete('/:mapId', (req, res) => {
  const { mapId } = req.params;
  const deletedMap = service.delete(mapId);
  res.json(deletedMap);
});

module.exports = router;
