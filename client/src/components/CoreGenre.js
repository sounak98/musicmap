import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spotify from '../containers/Spotify';
import AddNewTrack from './AddNewTrack';
import { withStyles } from '@material-ui/core/styles';
import {Paper, 
        Table, 
        TableHead, 
        TableRow, 
        TableBody, 
        TableCell, 
        Grid,
        Button, 
        Icon, 
        Typography,
        Chip,
        AppBar,
        Switch,
        Snackbar} from '@material-ui/core';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
const token = 'BQCEgGDO5KKUuD6BvfR1vQdASUPFHOx0AIFHjrra0Jr5PnY1mZ2gBsdWFPFi49iXsgYcPxQSeUODTyMTEQhDmHa9-xKl5sneO2thYO-Ich0RWWucIboeE8Jp2e-2pFpFT9MQPKZmKjKdzpiCNnkWWbUG3P5w43-6LKZVf6pqvyT3qB2k1TUtfeEX';
  
const buttonGradientBackground = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';

const styles = theme => ({
  subGenreContainer: {
    marginTop: theme.spacing.unit,
    width: '100%',
    overflowX: 'auto'
  },
  headerAppBar: {
    height: theme.spacing.unit * 15,
  },
  genreTitle: {
  },
  headerGridContainer: {
    height: '100%',
  },  
  headerContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '0 auto',
    width: 'parent',
    
  },
  playlistTable: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 700,
  },
  playButton: {
  },
  titleGrid: {
    flexGrow: 20
  },
  playGrid: {
    flexGrow: 1
  },
  icon: {
    margin: theme.spacing.unit,
    '&:hover': {
      color: green[200],
      cursor: 'pointer',
      transform: 'scale(1.5)'
    }
  },
  itemRow: {
      height: 'auto'
  },
  statusChip: {
  },
  actionButton: {
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize',
    borderRadius: theme.spacing.unit,
    minWidth: theme.spacing.unit * 10,
  },
  playlistHeader: {
      margin: '0 auto',
      textAlign: 'center'
  },
  genreMetadata : {
      marginTop: theme.spacing.unit
  }
  
});

/**** TODO : Remove hardcoded rows */
let id = 0;
function createData(status, artist, title, album, duration, year, provider, actions) {
  id += 1;
  return { id, status, artist, title, album, duration, year, provider, actions };
}

class CoreGenre extends Component {

    constructor(props){
        super(props);
        this.state = {
            genre: 'Surf Rock',
            tracks: [],
            totalDuration: '',
            showNotification: false,
            showPlayer: false,
            showNewTrackForm: false,
            currentTrack: {
                src: 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86',
                title: 'Cut To The Feeling',
                albumThumbnail: 'https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee',
                album: 'Cut To The Feeling',
                artist: 'Carly Rae Jepsen',
                year: '2017',
                trackId: {
                  spotify: '6EJiVf7U0p1BBfs0qqeb1f'
                }
            }
        }
    }
    
    async fetchAllTracks(){   
        fetch(`http://localhost:4000/tracks`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                tracks: data.tracks.map(item => {
                    return {
                        trackId: item.trackId,
                        album: item.album,
                        title: item.title,
                        year: item.year,
                        artists: item.artists,
                        duration: item.duration
                    }
                }),
                totalDuration : this.calculateTotalDuration(data.tracks)
            })
        });
    }

    /**
   * stream data from spotify if you have correct access token
   * @param {string} trackId 
   */
  playItOnSpotify(trackId){
    let accessToken = localStorage.getItem('mm_spotify_access_token');
    if(accessToken){
     console.log('got access token - ' + accessToken);
     fetch({
         url: `https://api.spotify.com/v1/tracks/${trackId}`,
         method: 'GET',
         headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept' : 'application/json'
        }
     })
     .then(function(response) {
        console.log(response);
       return response.json();
     })
     .then(function(trackInfo) {
       console.log(JSON.stringify(trackInfo));
       //update current track details in player
       this.setState({
         currentTrack: {
           title: trackInfo.name,
           src: trackInfo.href,
           album: trackInfo.album.name,
           artist: trackInfo.artists.name,
           year: trackInfo.album['release_date'].split('-')[0],
           albumThumbnail: trackInfo.album.images[0]
         }
       })
     });
    }
    else {
        console.log("going to get new token from spotify")
      this.getSpotifyAccessToken();
    }
   }

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            console.log(e);
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
    return hashParams;
    }

   getSpotifyAccessToken(){
    let clientId = 'f329b587614b4f97b8e2aadc26693dbc';
    let scopes = 'user-read-email';
    let redirect_uri = "http://localhost:3000/callback/";
    let url = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri);
    window.location = url;

    
    
  }

  playOnSpotify(){
      this.setState({
          showPlayer: true
      })
  }

  storeTokenAndExpiry(){

  }
    calculateTotalDuration(songs){
        let durations = songs.map(song => song.duration);
        let totalDuration = 0;
        durations.forEach(duration => {
           let timings = duration.split(":");
           totalDuration += (parseInt(timings[0]) * 60) +  parseInt(timings[1]); 
        });

        //convert seconds into hours and minutes
        return `${parseInt(totalDuration / 3600) > 0 ? (parseInt(totalDuration / 3600) + 'hours and'): ''} ${parseInt((totalDuration % 3600) / 60)} min`
        
    }
    handleActionOpen(e){
        e.preventDefault();
        this.setState({
            showNotification: true
        })
        console.log(e.target.text);
    }

    handleActionClose(){
        this.setState({
            showNotification: false
        })
    }

    addNewTrack(){
        this.setState({
            showNewTrackForm: true
        })
    }
    async componentDidMount(){
        /*
        if(!localStorage.getItem('mm_spotify_access_token')
        && window.location.href.includes('#access_token')) {
            //store access token in localStorage
            let params = this.getHashParams();
            localStorage.setItem('mm_spotify_access_token', params.access_token);
            console.log(" access token : " + localStorage.getItem('mm_spotify_access_token'));
        
        }
        else {
            console.log("stored access token : " + localStorage.getItem('mm_spotify_access_token'));
            //this.playOnSpotify(this.state.currentTrack.trackId.spotify);
        } */

        await this.fetchAllTracks();       
    }
    renderTracks(classes){
        if(this.state.tracks.length > 0){
            return (
                    <Table className={classes.playlistTable}>
                        <TableHead>
                        <TableRow className={classes.playlistHeader}>
                            <TableCell>Play On</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Year</TableCell>
                           {/* <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell> */}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.tracks.map(track => {
                            return (
                            <TableRow className={classes.itemRow} key={track.trackId}>
                                <TableCell> <Icon onClick={()=> this.playOnSpotify()} className={classNames(classes.icon, 'fab fa-spotify fa-2x')} color="secondary" /></TableCell>
                                <TableCell>{track.title}</TableCell>
                                <TableCell>{track.album}</TableCell>
                                <TableCell>{track.artists}</TableCell>
                                <TableCell>{track.duration}</TableCell>
                                <TableCell>{track.year}</TableCell>
                               {/*
                                <TableCell>
                                    <Chip label={track.status} className={classes.statusChip} variant="outlined" />
                                </TableCell>
                               
                                <TableCell>
                                    {
                                        row.actions.map(action => {
                                            return (
                                                <Button key={action} onClick={this.handleActionOpen.bind(this)} size="small" variant="contained" color="secondary" className={classes.actionButton}>
                                                {action}
                                                </Button>
                                            );
                                        })
                                    }
                                
                                </TableCell>
                                */}
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>    
            )
        }
        else {
            return (
                <h5>No Tracks in this Genre. Why don't you add some!</h5>
            )
        }
    }
    render(){
        const { classes } = this.props;
        return (
            <>
            <div className={classes.subGenreContainer}>
                <Paper className={classes.headerContainer} elevation={1} square={true}>
                    <AppBar className={classes.headerAppBar} position="sticky" color="inherit" elevation={0}>
                        <Grid container
                            alignContent='center'
                            alignItems='center'
                            direction='row'
                            justify='space-evenly'
                            className={classes.headerGridContainer}>
                            <Grid item className={classes.titleGrid}>
                                <Typography className={classes.genreTitle} variant="h4" component="h2">
                                {this.state.genre}
                                </Typography>
                                <Typography variant="body2" component="p" className={classes.genreMetadata}>
                                {this.state.tracks.length} songs &#8226; {this.state.totalDuration}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.playGrid}>
                                <Button onClick={this.addNewTrack.bind(this)} variant="contained" color="secondary" className={classes.playButton}>
                                    Add New Track
                                </Button>
                            </Grid>
                        </Grid>
                    </AppBar> 
                    {this.renderTracks(classes)}
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.showNotification}
                        autoHideDuration={2000}
                        onClose={this.handleActionClose.bind(this)}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Action registered successfully</span>} />
                </Paper>
            </div>
            {(this.state.showPlayer || window.location.href.includes("callback/")) ? <Spotify /> : null}
            <AddNewTrack show={this.state.showNewTrackForm} />
        </>
        );
    }
  
}


const mapStateToProps = state => {}
CoreGenre.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoreGenre);