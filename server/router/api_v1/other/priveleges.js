const { NO_PERMISSIONS } = require("../../../config/status");
const { ROOT_PRIVELEGES } = require("../../../config/priveleges");
const {
  ENTRY_CANT_DELETED,
  NO_PRIVELEGES,
} = require("../../../config/messages");
const { sendJSONError } = require("./json_messages");

module.exports = {
  isRoot(req, res, next) {
    const user = req.next?.user;
    if (user.privelages < ROOT_PRIVELEGES) {
      res.status(NO_PERMISSIONS).json(sendJSONError(NO_PRIVELEGES));
      return;
    }
    next();
  },
};
