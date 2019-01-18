import { MONGODB_URL } from 'babel-dotenv';
let mongoose = require('mongoose');

//TODO- use proper self-hosted prod mongoDB
//current online mongo instance is only for testing and limited in size
//and import it from seperate config file or keystore
mongoose.connect(MONGODB_URL);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.connection;
