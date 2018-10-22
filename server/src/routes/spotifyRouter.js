/**
 * router to handle all address related routes
 */
import express from 'express';
import { CONFIDENCE_NEEDED, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from 'babel-dotenv';
import validate from '../middlewares/validator';
import { SearchForAddress,
          DeactivateAddress, 
          ActivateAddress}  from '../schemas';
import WhitelistedAddressModel from '../models/whitelistedAddressModel';
import axios from 'axios';

//have to require as import doesn't work with non-js files
const nodesInNetwork = require('../../bdb-active-nodes.json');
const spotifyRouter = express.Router();
const addressModel = new WhitelistedAddressModel();

const redirect_uri = "http://localhost:4000/callback?scope=user-read-private%20user-read-email&state=34fFs29kd09";

spotifyRouter.get('/login', function(req, res) {
  let scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });
  
  

// POST request to activate address
spotifyRouter.post('/callback', 
            (req, res, next) => {

            console.log("/callback ", "code="+ req.params.code, " state=" + req.params.state)
            let body = {
              'grant_type':'authorization_code',
              'code': req.params.code,
              'redirect_uri': redirect_uri
            }  

            //encode auth credentials to base64
            auth = "Basic " + new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64");

            //get the access token from spotify
            axios({
              method: 'POST',
              url: 'https://accounts.spotify.com/api/token',
              header: {
                'Authorization': auth
              },
              data: body
            })
            .then(function (response) {
              res.status(200).json(response);
            })
            .catch(function (error) {
              next(new Error(error));
            });
                
});

// GET request to search for given address with consensus
spotifyRouter.get('/addresses', 
        validate({query: SearchForAddress}), 
        async (req, res, next) => {
          try{
            let confidenceLevel = await addressModel
                                        .searchForAddressConsensus(req.query, nodesInNetwork, 0, 0);
            if(!confidenceLevel){
              confidenceLevel = 0;
            }
            let responseObj = Object.assign({}, req.query);
            if(confidenceLevel >= CONFIDENCE_NEEDED){
              responseObj.success = true;
              responseObj.confidence = 100;
              res.status(200).json(responseObj);
            }
            else{
              responseObj.success = false;
              responseObj.confidence = confidenceLevel;
              res.status(404).json(responseObj);
            }
            
          } 
          catch(error){
            next(new Error(error));
          }              
});

// DELETE request for deactivating given address
spotifyRouter.delete('/addresses',
              validate({query: DeactivateAddress}),
              async (req, res, next) => {
              try{
                  await addressModel.deactivateAddress(req.query);
                  let responseObj = Object.assign({}, req.query);
                  responseObj.success = true;
                  res.status(200).json(responseObj);
              }
              catch(error){
                next(new Error(error));
              }
             
});

export default spotifyRouter;
