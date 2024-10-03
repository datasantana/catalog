const boom = require('@hapi/boom');

function validationHandler (schema, proprty) {
  return (req, res, next) => {
    const data = req[proprty];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  }
}

module.exports = validationHandler;
