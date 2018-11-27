const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.TrackSchema = new Schema(
  {
    hash: {type: String, required: true},
    trackId: {type: String, required: true},
    album: {type: String, required: true},
    title: {type: String, required: true},
    year: {type: Number, required: true},
    artists: {type: String, required: true},
    duration: {type: String, required: true},
    provider: {type: Array, required: true},
    publisher: {type: String, required: true},
    publishedOn: {type: Date, required: true},
    lastModifiedOn: {type: Date, required: true}
});
