/**
 * router to handle all track related routes
 */
import express from 'express';
import TrackController from '../controllers/trackController';

const trackController = new TrackController();
const trackRouter = express.Router();

// POST new track in OceanDB
trackRouter.post('/track', async (req, res, next) => {
    
        try{
            
           let tracks =  req.body.tracks.slice(0);
           let duplicateTracks = await trackController.saveTracks(tracks);
           return res.status(201).json(duplicateTracks)
           /*if(result.status === 201){
               return res.status(result.status).json(result.data)
           }
           else {
               throw new Error({
                    code : result.status,
                    message: result.statusText
                })
           }*/
        }
        catch(error){
            next(new Error(error));
        }

});


// GET track from OceanDB
trackRouter.get('/tracks', async (req, res, next) => {
    try{
        const tracks = await trackController.getAllTracks();
        console.log(" t " + tracks);
        res.status(200).json({tracks})
     }
     catch(error){
         next(new Error(error));
     }
});

/*
// PUT existing track in OceanDB
trackRouter.put('/track/:id', async (req, res, next) => {
    try{
        const result = await aquarius.updateTrack(req.params.id, req.body);
        if(result.status === (201 | 200)){
            return res.status(result.status).json(result.data)
        }
        else {
            throw new Error({
                 code : result.status,
                 message: result.statusText
             })
        }
     }
     catch(error){
         next(new Error(error));
     }
});


// DELETE existing track in OceanDB
trackRouter.delete('/track/:id', async (req, res, next) => {
    try{
        const result = await aquarius.removeTrack(req.params.id);
        if(result.status === 200){
            res.status(result.status).json(result.data)
        }
        else {
            throw new Error({
                 code : result.status,
                 message: result.statusText
             })
        }
     }
     catch(error){
         next(new Error(error));
     }   
});
*/
export default trackRouter;
