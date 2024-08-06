const response = require("../utils/response");

module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return response(401, null, "Missing Credentials", res);
    } else if (!validEmail(email)) {
      return response(401, null, "Invalid Format Email", res);
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return response(401, null, "Missing Credentials", res);
    } else if (!validEmail(email)) {
      return response(401, null, "Invalid Format Email", res);
    }
  }

  next();
};
