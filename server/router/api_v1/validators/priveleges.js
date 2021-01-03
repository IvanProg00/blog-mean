const { NO_PERMISSIONS } = require("../../../config/status");
const { ROOT_PRIVELEGES } = require("../../../config/priveleges");
const { ENTRY_CANT_DELETED } = require("../../../config/messages");

module.exports = {
  isRoot(req, res, next) {
    const user = req.next?.user;
    if (user.privelages < ROOT_PRIVELEGES) {
      res.status(NO_PERMISSIONS);
      res.json(sendJSONError(ENTRY_CANT_DELETED));
      return;
    }
    next();
  },
};
