const express = require('express');
const mapsService = require('../services/mapsService');
const validationHandler = require('../middlewares/validationHandler');
const { createMapSchema, updateMapSchema, getMapSchema } = require('../schemas/mapsSchema');
const router = express.Router();
const service = new mapsService();

router.get('/', async (req, res, next) => {
  try {
    const maps = await service.find();
    res.json(maps);
  } catch (error) {
    next(error);
  }
});

// router.get('/filter', (req, res) => {
//   const { filter } = req.query;
//   res.json({
//     filter,
//   });
// });

router.get('/:mapId',
  validationHandler(getMapSchema, 'params'),
  async (req, res, next) => {
  try {
    const { mapId } = req.params;
    const map = await service.findById(mapId);
    res.json(map);
  } catch (error) {
    next(error);
  }
});

// router.get('/:mapId/datasets/:datasetId', (req, res) => {
//   const { mapId, datasetId } = req.params;
//   res.json({
//     mapId,
//     datasets: [
//       datasetId, {"name": "dataset1", "url": "http://localhost:3000/dataset1"},
//       datasetId, {"name": "dataset2", "url": "http://localhost:3000/dataset2"},
//     ],
//   });
// });

router.post('/',
  validationHandler(createMapSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newMap = await service.create(body);
    res.status(201).json(newMap);
  } catch (error) {
    next(error);
  }
});

router.patch('/:mapId',
  validationHandler(getMapSchema, 'params'),
  validationHandler(updateMapSchema, 'body'),
  async (req, res, next) => {
  try {
    const { mapId } = req.params;
    const body = req.body;
    const updatedMap = await service.update(mapId, body);
    res.status(201).json(updatedMap);
  } catch (error) {
    next(error);
  }
});

// router.put('/:mapId', (req, res) => {
//   const { mapId } = req.params;
//   const body = req.body;
//   res.json({
//     message: 'Map replaced',
//     mapId,
//     map: body,
//   });
// });

router.delete('/:mapId', async (req, res, next) => {
  try {
    const { mapId } = req.params;
    const deletedMap = await service.delete(mapId);
    res.json(deletedMap);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
