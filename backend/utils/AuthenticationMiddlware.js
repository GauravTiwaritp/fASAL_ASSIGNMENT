const jwt = require("jsonwebtoken");
const authenticatUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.secreteKey);

    if (!decodedToken.id) {
      res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthenticated" });
  }
};

module.exports = { authenticatUser };
