//const { v4: uuidv4 } = require("uuid");

const userPlaylist = require("../Models/userPlaylist");
const User = require("../Models/userModel");

const createPlaylist = async (req, res) => {
  try {
    const { userName, userId, playlistType, playlistName } = req.body();
    const newUserPlaylist = {
      userName: userName,
      userId: userId,
      playlist: {
        playlistType: playlistType,
        playlistName: playlistName,
        movieNameContent: [],
      },
    };
    const createdPlaylist = await userPlaylist.create({ newUserPlaylist });
    res
      .status(200)
      .json({ message: "Playlist created successfully", createdPlaylist });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const addToPlaylist = async (req, res) => {
  try {
    const { userId, _id, playlistName, Title } = req.body();
    const Playlist = await userPlaylist.findbyId(_id);
    if (!Playlist) {
      res.status(404).json({ message: "Playlist not found" });
    } else {
      Playlist.playlist.movieNameContent.map((movie) => {
        if (movie === Title) {
          return res
            .status(400)
            .json({ message: "Movie already added to playlist" });
        }
      });
      Playlist.playlist.movieNameContent.push(Title);
      await Playlist.save();
      res.status(200).json({ message: "Movie added to playlist" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const removeFromPlaylist = async (req, res) => {
  try {
    const { userId, Title } = req.body();
    const userPlaytlist = await userPlaylist.findOne({ Title: Title });
    const length = userPlaylist.playlist.movieNameContent.length;
    if (!userPlaytlist) {
      return res.status(404).json({ message: "Playlist not found" });
    } else {
      userPlaytlist.playlist.movieNameContent.filter((movie) => {
        movie != Title;
      });
    }
    if (length == userPlaytlist.playlist.movieNameContent.length) {
      res.status(404).json({ mesage: "movie not found in playlist" });
    } else {
      res.status(200).json({ message: "movie removed from playlist" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const { userId, _id } = req.params;
    const response = await userPlaylist.findOne({ _id: _id });
    res.status(200).json({ message: "Playlist found", response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getAllPlaylist = async (req, res) => {
  try {
    const { userId } = req.body();
    const response = await userPlaylist.find({ userId: userId });
    if (!response) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist found", response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getPlaylistByName = async (req, res) => {
  try {
    const { userName, accessID } = req.body();
    const trial = await User.findOne({
      userName: userName,
      accessID: accessID,
    });
    if (!trial) {
      const response = await userPlaylist.find(
        { userName: userName },
        { "playlist.playlistType": { $ne: 1 } }
      );
      if (!response) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json({ message: "Playlist found", response });
    } else {
      const response = await userPlaylist.find({ userName: userName });
      if (!response) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.status(200).json({ message: "Playlist found", response });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { userId, _id } = req.body();
    const response = await userPlaylist.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "Playlist deleted successfully", response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getPlaylistById,
  getAllPlaylist,
  getPlaylistByName,
  deletePlaylist,
};
