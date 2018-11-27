const mongoose = require('mongoose');
const trackSchema =  require('../schemas/TrackSchema').TrackSchema;

let TrackModel = mongoose.model('tracks', trackSchema); 

//save new vote
const saveTrack = (newTrack, cb) => {

    let track = new TrackModel(newTrack);
    return track.save((err, data) => {
        if (err) return cb(err);
        cb(null, data);
      });
  }

//find track if exists
const findTrackByHash = (hash, cb) => {
    return TrackModel.findOne({hash}, (err, track) => {
      if (err) return cb(err);
      cb(null, track);
    })
}

const findAllTracks = (cb) => {
    return TrackModel.find({}, (err, tracks) => {
      if (err) return cb(err);
       cb(null, tracks);
    })
}

export {
    saveTrack,
    findTrackByHash,
    findAllTracks 
}