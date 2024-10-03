const Joi = require('joi');

const mapId = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const image = Joi.string();
const price = Joi.number().integer().min(1).max(10);
const url = Joi.string();
const visible = Joi.boolean();

const createMapSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  price: price.required(),
  url: url.required(),
  visible: visible.required(),
});

const updateMapSchema = Joi.object({
  name: name,
  description: description,
  image: image,
  price: price,
  url: url,
  visible: visible,
});

const getMapSchema = Joi.object({
  mapId: mapId.required(),
});

module.exports = { createMapSchema, updateMapSchema, getMapSchema };
