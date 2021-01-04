const { checkSchema } = require("express-validator");

const MIN_USERNAME = 2;
const MAX_USERNAME = 60;

const MIN_PASSWORD = 4;
const MAX_PASSWORD = 24;

module.exports = {
  createUser: checkSchema({
    username: {
      isString: {
        bail: true,
      },
      in: ["body"],
      isLength: {
        options: {
          min: MIN_USERNAME,
          max: MAX_USERNAME,
        },
      },
    },
    password: {
      isString: {
        bail: true,
      },
      in: ["body"],
      isLength: {
        options: {
          min: MIN_PASSWORD,
          max: MAX_PASSWORD,
        },
        bail: true,
      },
    },
    email: {
      in: ["body"],
      isEmail: {
        bail: true,
      },
    },
  }),
  changeUser: checkSchema({
    username: {
      isString: {
        bail: true,
      },
      in: ["body"],
      isLength: {
        options: {
          min: MIN_USERNAME,
          max: MAX_USERNAME,
        },
      },
    },
    email: {
      in: ["body"],
      isEmail: {
        bail: true,
      },
    },
  }),
  loginUser: checkSchema({
    username: {
      isString: {
        bail: true,
      },
      in: ["body"],
      isLength: {
        options: {
          min: MIN_USERNAME,
          max: MAX_USERNAME,
        },
      },
    },
    password: {
      isString: {
        bail: true,
      },
      in: ["body"],
      isLength: {
        options: {
          min: MIN_PASSWORD,
          max: MAX_PASSWORD,
        },
        bail: true,
      },
    },
  }),
};
