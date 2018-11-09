import axios from 'axios';
import { AQUARIUS_ASSETS_URL } from 'babel-dotenv';

export default class AquariusModel {
   
    async addTrack(trackMetadata){
       const res = await axios({
                        method:'post',
                        url:AQUARIUS_ASSETS_URL + '/track',
                        data: trackMetadata
                    });
        return res;
    }

    async getTrack(trackId){
        const res = await axios({
            method:'get',
            url:AQUARIUS_ASSETS_URL + `/track/${trackId}`
        });
        return res;
    }

    async updateTrack(trackId, trackMetadata){
        const res = await axios({
            method:'put',
            url:AQUARIUS_ASSETS_URL + `/track/${trackId}`,
            data: trackMetadata
        });
        return res;
    }

    async removeTrack(trackId){
        const res = await axios({
            method:'delete',
            url:AQUARIUS_ASSETS_URL + `/track/${trackId}`
        });
        return res;
    }
}