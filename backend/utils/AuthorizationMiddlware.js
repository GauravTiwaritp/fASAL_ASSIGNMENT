const jwt = require("jsonwebtoken");

//this middlware is for create playlist,add,delete from playlist and delete playlist
const autherisedUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.secreteKey);

    if (req.body.userId !== decodedToken.id) {
      res.status(401).json({ message: "Unauthorized for this request" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized " });
  }
};

//this middlware is for seeing the playlist
const authenticatUserPlaylist = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.secreteKey);

    req.body.accessID = decodedToken.id;
    next();
  } catch (err) {
    res.status(500).json({ message: "please try again " });
  }
};

module.exports = { autherisedUser, authenticatUserPlaylist };
