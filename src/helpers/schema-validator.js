export default class SchemaValidator {

  static validate(schema) {
    return async (req, res, next) => {
      try {
        const result = await SchemaValidator.isValid(schema, {
          body: req.body,
          query: req.query,
          params: req.params,
        });

        req.data = result.body || {};
      

        return next();
      } catch (error) {
      

        return res.status(400).json({
          status: 'error',
          type_error: 'VALIDATION_ERROR',
          field: error.path,
          message: error.message
        });
      }
    };
  }

  static isValid(schema, object) {
    return schema.validate(object, {
      recursive: true,
      stripUnknown: true,
    });
  }
}
