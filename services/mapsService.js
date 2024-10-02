const { faker } = require('@faker-js/faker');

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
      });
    }
  }

  create(data) {
    const newMap = {
      "mapId": this.maps.length + 1,
      ...data,
    };
    this.maps.push(newMap);
    return newMap;
  }

  find() {
    return this.maps;
  }

  findById(mapId) {
    return this.maps.find((map) => map.mapId === parseInt(mapId, 10));
  }

  update(mapId, data) {
    const mapIndex = this.maps.findIndex((map) => map.mapId === parseInt(mapId, 10));
    if (mapIndex === -1) {
      throw new Error('Map not found');
    } else {
      this.maps[mapIndex] = {
        ...this.maps[mapIndex],
        ...data,
      };
      return this.maps[mapIndex];
    }
  }

  delete(mapId) {
    const mapIndex = this.maps.findIndex((map) => map.mapId === parseInt(mapId, 10));
    if (mapIndex === -1) {
      throw new Error('Map not found');
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
