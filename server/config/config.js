module.exports = {
  PORT: process.env.PORT || 8081,

  MONGODB_USERNAME: "node",
  MONGODB_PASSWORD: "angular",
  MONGODB_HOST: "db",
  MONGODB_PORT: 27017,
  MONGODB_DB: "blog",

  CRYPT_KEY: "jqygalkczojw",
  JWT_KEY: "pguhw6di6pn3",

  ROOT_PRIVELEGES: 2,
  CHILD_PRIVELEGES: 1,
};
