const { faker, fa } = require('@faker-js/faker');

class datasetsService {
  constructor() {
    this.datasets = [];
    this.generate();
  }

  generate() {
    const limit = 50;
    for (let i = 0; i < limit; i++) {
      this.datasets.push({
        "datasetId": i,
        "name": faker.commerce.productName(),
        "category": faker.commerce.department(),
        "description": faker.lorem.paragraph(),
        "attributes": [
          {"material": faker.commerce.productMaterial(), "type": "string"},
          {"color": faker.color.human(), "type": "string"},
          {"size": faker.number.int({max: 10}), "type": "number"},
          {"date": faker.date.recent(), "type": "date"},
        ],
        "image": faker.image.url(),
        "price": parseInt(faker.commerce.price(), 10),
        "url": `http://localhost:3000/datasets/${i}`,
      });
    }
  }

  create(data) {
    const newDataset = {
      "datasetId": this.datasets.length + 1,
      ...data,
    };
    this.datasets.push(newDataset);
    return newDataset;
  }

  find() {
    return this.datasets;
  }

  findById(datasetId) {
    return this.datasets.find((dataset) => dataset.datasetId === parseInt(datasetId, 10));
  }

  update(datasetId, data) {
    const datasetIndex = this.datasets.findIndex((dataset) => dataset.datasetId === parseInt(datasetId, 10));
    if (datasetIndex === -1) {
      throw new Error('Dataset not found');
    } else {
      this.datasets[datasetIndex] = {
        ...this.datasets[datasetIndex],
        ...data,
      };
      return this.datasets[datasetIndex];
    }
  }

  delete(datasetId) {
    const datasetIndex = this.datasets.findIndex((dataset) => dataset.datasetId === parseInt(datasetId, 10));
    if (datasetIndex === -1) {
      throw new Error('Dataset not found');
    } else {
      this.datasets.splice(datasetIndex, 1);
      return {
        message: 'Dataset deleted',
      };
    }
  }
}

module.exports = datasetsService;
