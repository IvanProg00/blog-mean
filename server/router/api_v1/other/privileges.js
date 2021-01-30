const { NO_PERMISSIONS } = require("../../../config/status");
const { NO_PRIVILEGES } = require("../../../config/messages");
const { ROOT_PRIVILEGES } = require("../../../config/privileges");
const { sendJSONError } = require("./json_messages");

module.exports = {
  isRoot(req, res, next) {
    const user = req.next?.user;
    if (user.privelages < ROOT_PRIVILEGES) {
      res.status(NO_PERMISSIONS).json(sendJSONError(NO_PRIVILEGES));
      return;
    }
    next();
  },
};
