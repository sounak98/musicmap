# Cryptaldash Rest API

* The directory structure for this project is as below -


```.
.
├── Dockerfile  							//Docker file for the api
├── README.md 							//This file
├── bdb-active-nodes.json 				//list of active nodes to search addresses
├── docker-compose.yml 					//docker compose file to set up environment for tests
├── package-lock.json
├── package.json. 						//manifest file for dependencies management
├── .env     								//key-pairs for confidential info (do not publish in git repo) 
├── .babelrc								// babel transpiling configuration
├── src									
│   ├── index.js	 //main entry file	
│   ├── middlewares 
│   │   ├── authorization.js //verify if user is authorised
│   │   ├── errorHandler.js //general error handler
│   │   └── validator.js    //validate incoming request schemas
│   ├── models
│   │   ├── bigchaindbModel.js   // functions to perform operations in bigchaindb network
│   │   ├── mongoModel.js			// funtions to query data from bigchaindb network
│   │   └── whitelistedAddressModel.js //cryptaldash business logic
│   ├── routes
│   │   ├── bdbRouter.js  //routes to all known routes
│   │   ├── index.js 
│   │   └── unknownRouter.js //handle unknown routes
│   └── schemas            // directory with required Request schemas to validate requests
│       ├── ActivateAddressReq.js
│       ├── DeactivateAddressReq.js
│       ├── SearchForAddressReq.js
│       └── index.js
├── ssl              //certificates for CA, server and client
│   ├── ca-crt.pem
│   ├── client1-crt.pem
│   ├── client1-key.pem
│   ├── server-crt.pem
│   └── server-key.pem
└── test.     
    └── test.js.   //tests for API
```

Most of the modules in this project contains details about their purpose. 

## Pre-requisities
 * Latest stable release of docker (to run with docker).
 > Note - To run with docker, see section - *Usage (with Docker) below*
 * Running BigchainDB node (to run without docker). [Get it here](https://github.com/bigchaindb/bigchaindb)

## Usage (without Docker)

- Ensure BigchainDB node is up and running at locally and reachable at `http://localhost:9984/api/v1/`
- clone this repo using `git clone <this-repo-url>.git`.
- create `.env` file with following properties

```
BDB_NODE_URL=http://localhost:9984/api/v1/
BDB_APP_ID=""
BDB_APP_KEY=""
MONGODB_URL=mongodb://localhost:27017
CONFIDENCE_NEEDED=<consensus-percentage-needed>
PUB_KEY=<your-public-key>
PRIV_KEY=<your-private-key>
HTTP_SERVER_PORT=4000
HTTPS_SERVER_PORT=4001
```
> **Note** - values in `<>` needs to be updated with correct ones.

- from terminal, execute `npm install`
- from terminal, execute `npm start`

At this point, API is availble at `https://localhost:4001/`

## Usage (with Docker)

- Ensure BigchainDB node is up and running at locally and reachable at `http://localhost:9984/api/v1/`
- clone this repo using `git clone <this-repo-url>.git`.
- create `.env` file with following properties

```
BDB_NODE_URL=http://bigchaindb:9984/api/v1/
BDB_APP_ID=""
BDB_APP_KEY=""
MONGODB_URL=mongodb://mongodb:27017
CONFIDENCE_NEEDED=<consensus-percentage-needed>
PUB_KEY=<your-public-key>
PRIV_KEY=<your-private-key>
HTTP_SERVER_PORT=4000
HTTPS_SERVER_PORT=4001

```

> **Note** - values in `<>` needs to be updated with correct ones.

- in `bdb-active-nodes.json`, replace `localhost` with `mongodb`.
- from terminal, execute `npm run docker`
- wait for few minutes, till docker containers are up and running. This can be verified using `docker ps` command in terminal. Yuo should see 4 containers - api, bigchaindb, mongodb and tendermint in UP/STARTED state.

At this point, API is availble at `https://localhost:4001/`

> **Note** - Use **client1-crt.pem** and **client1-key.pem** to access API endpoints. These files are present in `ssl/` folder. 

## Endpoints

### 1) POST /addresses
#### Request body :
 
```
{
    
    "creator": <string>,
    "coinType": <string>,
    "address": <string>,
    "account": <string>
}

``` 
#### Response body:

Positive response (status code - 201)

```
{
  "creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //true
}
```
 
 Negative Response (status code - 500)
 
```
{
  "creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //false
	"message" : <string> //Error message
}

```


### 2) DELETE /addresses
#### Request query params :
 
```
{
    
    "creator": <string>,
    "coinType": <string>,
    "address": <string>,
    "account": <string>
}

``` 
#### Response body:

Positive response (status code - 200)

```
{
  	"creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //true
}
```
 
 Negative Response (status code - 500)
 
```
{
  	"creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //false
	"message" : <string> //Error message
}
```

### 3) GET /addresses
#### Request query params :
 
```
{
    "coinType": <string>,
    "address": <string>,
    "account": <string>
}

``` 
#### Response body:

Positive response (status code - 200)

```
{
  	"creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //true
	"confidence": <number> //returns normally number greater than the CONFIDENCE_NEEDED
							   // value provided in .env file
}
```
 
 Negative Response (status code - 404)
 
```
{
  "creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //false
	"confidence" : <number> //returns number less than CONFIDENCE_NEEDED
}
```

 Negative Response (status code - 500)
 
```
{
  "creator": <string>,
	"coinType": <string>,
	"address": <string>,
	"account": <string>,
	"success": <boolean> //false
	"message" : <string> //Error message
}
```
### 4) GET, POST, DELETE, PUT /any-other-unknown-routes 

#### Response body:

 
 Negative Response (status code - 404)
 
```
{
    "success": false,
    "message": "Requested resource not found."
}
```

