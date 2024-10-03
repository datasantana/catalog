const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class mapsService {
  constructor() {
    this.maps = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.maps.push({
        "mapId": i,
        "name": faker.location.city(),
        "description": faker.lorem.paragraph(),
        "image": faker.image.url(),
        "price": parseInt(faker.commerce.price(), 10),
        "url": `http://localhost:3000/maps/${i}`,
        "visible": faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newMap = {
      "mapId": this.maps.length + 1,
      ...data,
    };
    this.maps.push(newMap);
    return newMap;
  }

  async find() {
    if (this.maps.length === 0) {
      throw boom.notFound('Cannot get maps');
    } else {
      return this.maps;
    }
  }

  async findById(mapId) {
    const map = this.maps.find((map) => map.mapId === parseInt(mapId, 10));
    if (!map) {
      throw boom.notFound('Map not found');
    }
    if (!map.visible) {
      throw boom.forbidden('Map is not visible');
    } else {
      return this.maps[mapId];
    }
  }

  async update(mapId, data) {
    const mapIndex = this.maps.findIndex((map) => map.mapId === parseInt(mapId, 10));
    if (mapIndex === -1) {
      throw boom.notFound('Map not found');
    } else {
      this.maps[mapIndex] = {
        ...this.maps[mapIndex],
        ...data,
      };
      return this.maps[mapIndex];
    }
  }

  async delete(mapId) {
    const mapIndex = this.maps.findIndex((map) => map.mapId === parseInt(mapId, 10));
    if (mapIndex === -1) {
      throw boom.notFound('Map not found');
    } else {
      this.maps.splice(mapIndex, 1);
      return {
        message: 'Map deleted',
        mapId,
      };
    }
  }
}

module.exports = mapsService;
