/**
 * router to handle all spotify related routes
 */
import express from 'express';
import axios from 'axios';
import validate from '../middlewares/validator';
import SpotifyModel from '../models/spotifyModel';


const spotifyRouter = express.Router();
const spotify = new SpotifyModel();


const redirect_uri = "http://localhost:4000/callback?scope=user-read-private%20user-read-email&state=34fFs29kd09";

spotifyRouter.get('/spotify/track/:id', async (req, res, next) => {
      try{
        let result = await spotify.getTrackMetadata(req.params.id);
        res.status(result.status).json(result.data);
      }
      catch(error){
        next(new Error(error));
      }  
 
  });
  
spotifyRouter.get('/spotify/search', async (req, res, next) => {
    try{
      let result = await spotify.searchTracks(req.query['q'], 15, 0);
      res.status(result.status).json(result.data);
    }
    catch(error){
      next(new Error(error));
    }  

});
export default spotifyRouter;
