const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userPlaylistSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  playlist: {
    playlistType: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 0,
    },
    playlistName: {
      type: String,
      default: "Untitled Playlist",
    },
    movieNameContent: {
      type: [string],
    },
  },
});

module.exports = mongoose.model("UserPlaylist", userPlaylistSchema);
