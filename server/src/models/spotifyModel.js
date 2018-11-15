import axios from 'axios';
import qs from 'qs';
import { SPOTIFY_TOKEN_URL, 
    SPOTIFY_WEB_API_BASE_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET } from 'babel-dotenv';
import { runInNewContext } from 'vm';

const auth = 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64');

export default class SpotifyModel {

    constructor(){
        this.token = "";
        this.tokenExpiry = Date.now();
    }
   
    async _getToken(){
        let res =null;
        try{
           res = await axios({
                    method:'post',
                    url:SPOTIFY_TOKEN_URL,
                    headers: {
                        'Authorization': auth,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify({
                        'grant_type': 'client_credentials'
                    })
                });
       
        }
        catch(error){
            console.log(error);
            throw new Error(error);
        }

        return res;
    }

    async getTrackMetadata(trackId){
        
        if(!this._isTokenValid()){
            let tokenRes = await this._getToken();
            this.token = tokenRes.data['access_token']
            this.tokenExpiry = Date.now() + (parseInt(tokenRes.data['expires_in'] * 1000));
        }
         
        let res = null;
        try {
            res = await axios({
                method:'get',
                url:SPOTIFY_WEB_API_BASE_URL + `/tracks/${trackId}`,
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            });
        }
        catch(error){
            console.log(error)
            throw new Error(error);
        }
        
        return res;
    }

    _isTokenValid(){
        if(this.tokenExpiry > Date.now()){
            console.log("Token is valid")
            return true;
        }
        return false;
    }
}