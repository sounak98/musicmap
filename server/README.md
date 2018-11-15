# MusicMap Server

 

## API

## Spotify
### 1.1) GET /spotify/track/:id

## Track
### 2.1) POST /track
#### Request body :
 
``` 
{
    "album": "All Single Ladies",
    "artist": "Beyoncee",
    "duration": "02:12",
    "id": "1ab23b25f12dde132134",
    "nexus": "Electro Punk",
    "provider": [
        {
            "name": "spotify"
        },
        {
            "trackId": "spotify:uri:5def3431453cb"
        }
    ],
    "publisher": "whitedragon",
    "timestamp": 11032034450212332,
    "title": "Put on the Ring",
    "year": 2015
}


``` 
#### Response body:

Positive response (status code - 201)

Negative Response (status code - 400, 404, 500)
 
```
{
  	"code": <number>,
	"message": <string>
}
```

### 2.2) GET /track/:id

#### Response body:

Positive response (status code - 200)

```
{
    "album": "All Single Ladies",
    "artist": "Beyoncee",
    "duration": "02:12",
    "id": "1ab23b25f12dde132134",
    "nexus": "Electro Punk",
    "provider": [
        {
            "name": "spotify"
        },
        {
            "trackId": "spotify:uri:5def3431453cb"
        }
    ],
    "publisher": "whitedragon",
    "timestamp": 11032034450212332,
    "title": "Put on the Ring",
    "year": 2015
}
```
 
 Negative Response (status code - 404, 400, 500)
 
```
{
  	"code": <number>,
	"message": <string>
}
```
### 2.3) PUT /track/:id

#### Request body :
 
``` 
{
    "album": "All Single Ladies",
    "artist": "Beyoncee",
    "duration": "02:12",
    "id": "1ab23b25f12dde132134",
    "nexus": "Electro Punk",
    "provider": [
        {
            "name": "spotify"
        },
        {
            "trackId": "spotify:uri:5def3431453cb"
        }
    ],
    "publisher": "whitedragon",
    "timestamp": 11032034450212332,
    "title": "Put on the Ring",
    "year": 2015
}


``` 
#### Response body:

Positive response (status code - 201)

Negative Response (status code - 400, 404, 500)
 
```
{
  	"code": <number>,
	"message": <string>
}
```

### 2.4) DELETE /track/:id

#### Response body:

Positive response (status code - 200)

Negative Response (status code - 404, 400, 500)
 
```
{
  	"code": <number>,
	"message": <string>
}
```

### 3) GET, POST, DELETE, PUT /any-other-unknown-routes 

#### Response body:

 
 Negative Response (status code - 404)
 
```
{
    "success": false,
    "message": "Requested resource not found."
}
```

