/**
 * router to handle all track related routes
 */
import express from 'express';
import validate from '../middlewares/validator';
import { SearchForAddress,
          DeactivateAddress, 
          ActivateAddress}  from '../schemas';
import AquariusModel from '../models/aquariusModel';


const trackRouter = express.Router();
const aquarius = new AquariusModel();

// POST new track in OceanDB
trackRouter.post('/track', async (req, res, next) => {
        try{
           const result = await aquarius.addTrack(req.body);
           if(result.status === 201){
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


// GET track from OceanDB
trackRouter.get('/track/:id', async (req, res, next) => {
    try{
        const result = await aquarius.getTrack(req.params.id);
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

export default trackRouter;
