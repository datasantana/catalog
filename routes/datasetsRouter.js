const express = require('express');
const datasetsService = require('../services/datasetsService');
const router = express.Router();
const service = new datasetsService();

// sepecific paths should be defined before dynamic paths
// for example, /datasets/filter should be defined before /datasets/:datasetId
router.get('/', (req, res) => {
  const datasets = service.find();
  res.json(datasets);
});

// router.get('/filter', (req, res) => {
//   const { filter } = req.query;
//   res.json({
//     filter,
//   });
// });

router.get('/:datasetId', (req, res) => {
  const { datasetId } = req.params;
  const dataset = service.findById(datasetId);
  res.json(dataset);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newDataset = service.create(body);
  res.status(201).json(newDataset);
});

router.patch('/:datasetId', (req, res) => {
  const { datasetId } = req.params;
  const body = req.body;
  const updatedDataset = service.update(datasetId, body);
  res.json(updatedDataset);
});

router.delete('/:datasetId', (req, res) => {
  const { datasetId } = req.params;
  const deletedDataset = service.delete(datasetId);
  res.json(deletedDataset);
});

module.exports = router;
