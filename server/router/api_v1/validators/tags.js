const { checkSchema } = require("express-validator");

const MIN_TITLE = 2;
const MAX_TITLE = 40;

module.exports = {
  createTag: checkSchema({
    title: {
      isString: {
        bail: true,
      },
      isLength: {
        bail: true,
        options: {
          min: MIN_TITLE,
          max: MAX_TITLE,
        },
      },
    },
  }),
  changeTag: checkSchema({
    title: {
      isString: {
        bail: true,
      },
      isLength: {
        bail: true,
        options: {
          min: MIN_TITLE,
          max: MAX_TITLE,
        },
      },
    },
  }),
};
