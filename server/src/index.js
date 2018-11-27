/**
 * (main entry file) express server module
 */
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { 
        HTTP_SERVER_PORT,
        SERVER_KEY_PATH,
        SERVER_CRT_PATH,
        CA_CRT_PATH } from 'babel-dotenv';
import { spotifyRouter, unknownRouter, trackRouter } from './routes';
import { handleErrors } from './middlewares/errorHandler';
const db = require('./db-connect.js');

export const app = express();

// Set up a whitelist and check against it:
let whitelist = ['http://localhost:3000']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// configure CORS headers
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

//handle known routes
app.use('/', trackRouter);
app.use('/', spotifyRouter);

//handle unknown routes
app.use('*',unknownRouter);

//handle errors
app.use(handleErrors);

/*
const keyPath = path.resolve(__dirname, SERVER_KEY_PATH);
const certPath = path.resolve(__dirname, SERVER_CRT_PATH);
const caPath = path.resolve(__dirname, CA_CRT_PATH);

const cert = fs.readFileSync(certPath, 'utf8');
const key = fs.readFileSync(keyPath, 'utf8');
const ca = fs.readFileSync(caPath, 'utf8');

//set the key and certificate
const options = {
    key: key,
    cert: cert,
    ca: ca,
    requestCert: true,
    rejectUnauthorized: true
};


//start https server
const HTTPS_PORT = HTTPS_SERVER_PORT || 4001;
const httpsServer = https.createServer(options, app);
httpsServer.listen(HTTPS_PORT, () => {
        console.log(`HTTPS Server started on port ${HTTPS_PORT}`)
});
*/

db.on('error', () => {
  console.error.bind(console, 'connection error:');
  process.exit(1);
});

db.once('open', function() {
  console.log('Connected to Database...');

  //start express server
  app.listen(HTTP_SERVER_PORT, ()=> {
    console.log(`server started on port ${HTTP_SERVER_PORT}`)
  })
});
