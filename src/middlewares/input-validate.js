const path = require('path');
const Ajv = require('ajv');
const logger = require("../logger");

const ajv = new Ajv({
  useDefaults: true,
  allErrors : true,
  removeAdditional: "all",
  // verbose: true,
  coerceTypes: false
});

module.exports = (module, url, name) => {
  let validate;

  try {
    const schemaDir = SOURCE_DIR + "/api/" + module + "/input-schema/" + name;
    const schema = require(schemaDir);
    validate = ajv.compile(schema);
  } catch {
    logger.warning(`URL  '${url}': Have no input validation`);
  }

  return (req, res , next) => {
    if (!name) {
      next();
    }

    const isValidData = validate(req.data);

    if (isValidData) {
      logger.info(`${req.url} \ndata:${JSON.stringify(req.data)}`);
      next();
    } else {
      handleValidateError(validate.errors)
    }

    function handleValidateError(errors) {
      errors = errors.map(o => {
        const property = o.dataPath.replace(".", "");
        const message = property ? `${property} ${o.message}` : o.message;
        return message
      })

      logger.warning(`
        REQUEST ERROR:
        url: ${req.url}
        data: ${JSON.stringify(req.data)}
        errors: ${JSON.stringify(errors)}
      `);

      res.status(500).json({
        status : 500,
        errors : errors
      });
    }
  }
}
