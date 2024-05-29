const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getPlaylistById,
  getAllPlaylist,
  getPlaylistByName,
  deletePlaylist,
} = require("../controllers/playlistController");
const { authenticatUser } = require("../utils/AuthenticationMiddlware");
const {
  autherisedUser,
  authenticatUserPlaylist,
} = require("../utils/AuthorizationMiddlware");

router.post("/createPlaylist", authenticatUser, autherisedUser, createPlaylist);
router.post("/addToPlaylist", authenticatUser, autherisedUser, addToPlaylist);
router.post(
  "/removeFromPlaylist",
  authenticatUser,
  autherisedUser,
  removeFromPlaylist
);
router.post("/getPlaylistById", authenticatUser, getPlaylistById);
router.post("/getAllPlaylist", authenticatUser, getAllPlaylist);
router.post(
  "/getPlaylistByName",
  authenticatUser,
  authenticatUserPlaylist,
  getPlaylistByName
);
router.post("/deletePlaylist", authenticatUser, autherisedUser, deletePlaylist);
module.exports = router;
