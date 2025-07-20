const { validateUserToken } = require("../utils/authentication");

function checkForUserCookieAuthentication(cookieName) {
  return (req, res, next) => {
    const cookieTokenValue = req.cookies[cookieName];

    if (!cookieTokenValue) return next();

    try {
      const userPayload = validateUserToken(cookieTokenValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

module.exports = { checkForUserCookieAuthentication };
