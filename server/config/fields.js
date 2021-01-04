module.exports = {
  ALL_ENTRIES: { __v: 0 },
  ONE_ENTRY: { __v: 0 },
  CREATE_ENTRY: ["_id", "title", "text", "tagsId", "usersId"],
  CHANGE_ENTRY: ["_id", "title", "text", "tagsId"],

  ALL_USERS: { __v: 0, password: 0 },
  ONE_USER: { __v: 0, password: 0 },
  CREATE_USER: ["username", "password", "email"],
  CHANGE_USER: ["username", "email"],

  ALL_TAGS: { __v: 0 },
  ONE_TAG: { __v: 0 },
  CREATE_TAG: ["title"],
  CHANGE_TAG: ["title"],

  LOGIN: ["username", "password"],
};
