const { checkSchema } = require("express-validator");

MIN_TITLE = 2;
MAX_TITLE = 120;

MIN_TEXT = 10;
MAX_TEXT = 800;

module.exports = {
  createEntry: checkSchema({
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
    text: {
      isString: {
        bail: true,
      },
      isLength: {
        bail: true,
        options: {
          min: MIN_TEXT,
          max: MAX_TEXT,
        },
        errorMessage: `Min ${MIN_TEXT} and Max ${MAX_TEXT} characters can be.`
      },
    },
  }),
  changeEntry: checkSchema({
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
    text: {
      isString: {
        bail: true,
      },
      isLength: {
        bail: true,
        options: {
          min: MIN_TEXT,
          max: MAX_TEXT,
        },
      },
    },
  }),
};
