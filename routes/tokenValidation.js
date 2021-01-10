const jwt = require("jsonwebtoken");

function auth(req, res) {
  const token = req.header("auth_token");
  if (!token) {
    return res.status(401).send("Please log in first.");
  }
  try {
    const tokinVerification = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = tokinVerification;
  } catch (err) {
    res.status(403).send("Invalid token.");
  }
}

module.exports = auth;
