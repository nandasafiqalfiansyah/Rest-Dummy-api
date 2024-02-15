const localStorage = require("localStorage");

function initializeSession(req, res, next) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  req.session = {
    isLoggedIn: isLoggedIn === "true",
    username: id || null,
    username: username || null,
    role: role || null,
  };

  next();
}

module.exports = { initializeSession };
