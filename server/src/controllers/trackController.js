import { saveTrack, findTrackByHash, findAllTracks } from '../models/trackModel';
let hash = require('object-hash');

class TrackController {

    constructor(){}

    async saveTracks(tracks){
        let duplicateTracks = [];
        await tracks.map(async (track) => {

            //hash track to get id
            track['hash'] =  hash(track);
            console.log("Track hash - " + hash(track))
            track['publishedOn'] = Date.now();
            track['lastModifiedOn'] = Date.now();

            let isDuplicateTrack = await this.checkDuplicates(track.hash);
            console.log(track.hash + " is duplicate?? = " +  isDuplicateTrack);
            if(!isDuplicateTrack){
                //save track in db
                await saveTrack(track, (err, savedTrack) => {
                    if(err) return new Error(err);
                    console.log(savedTrack);
                })
            }
            else {
                duplicateTracks.push(track);
            }  
        });
        return duplicateTracks;
    }

    async checkDuplicates(hash){
       return await findTrackByHash(hash, async (err, hashedTrack) => {
            if(err) return new Error(err);
            console.log(hashedTrack);
            if(hashedTrack) return true;
            return false;
        })
    }
    
    async getAllTracks(){
        return await findAllTracks(async (err, tracks) => {
            if(err) return new Error(err);
            console.log(tracks)
            return tracks;
        });
    }
}

export default TrackController;