import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
        Switch} from '@material-ui/core';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import FaceIcon from '@material-ui/icons/Face';

const buttonGradientBackground = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';

const styles = theme => ({
  subGenreContainer: {
    marginTop: theme.spacing.unit,
    width: '100%',
    overflowX: 'auto'
  },
  headerAppBar: {
    height: theme.spacing.unit * 15,
    backgroundColor: buttonGradientBackground
  },
  genreTitle: {
    color: buttonGradientBackground
  },
  headerGridContainer: {
    height: '100%' 
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
    borderRadius: theme.spacing.unit * 2,
    background: buttonGradientBackground,

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
    margin: theme.spacing.unit,
  },
  actionButton: {
    marginLeft: theme.spacing.unit,
    textTransform: 'capitalize',
    borderRadius: theme.spacing.unit,
    minWidth: theme.spacing.unit * 10,
    background: buttonGradientBackground
  },
  playlistHeader: {
      margin: '0 auto',
      textAlign: 'center'
  },
  genreMetadata : {
      marginTop: theme.spacing.unit * 10
  }
  
});

/**** TODO : Remove hardcoded rows */
let id = 0;
function createData(status, artist, title, album, duration, year, provider, actions) {
  id += 1;
  return { id, status, artist, title, album, duration, year, provider, actions };
}

const rows = [
    createData('Applied', 'The Ziggens', 'Goin\' Richter', 'Pomona Lisa', '05:53', 1997, 'spotify', ['Challenge']),
    createData('Challenged', 'Slacktone', 'Tidal Wave', 'Another Album', '03:21', 2011, 'spotify', ['Accept', 'Reject']),
    createData('Accepted', 'The Revels', 'Church Key', 'Intoxical!!', '05:18', 1965, 'spotify', []),
    createData('Rejected', 'The Centurians', 'Bullwinkle pt.II', 'Surf War', '06:10', 2005, 'spotify', ['Reapply']),
    createData('Applied', 'The Ziggens', 'Goin\' Richter', 'Pomona Lisa', '04:53', 1997, 'spotify', ['Challenge']),
    createData('Challenged', 'Slacktone', 'Tidal Wave', 'Another Album', '03:21', 2011, 'spotify', ['Accept', 'Reject']),
    createData('Accepted', 'The Revels', 'Church Key', 'Intoxical!!', '05:18', 1965, 'spotify', []),
    createData('Rejected', 'The Centurians', 'Bullwinkle pt.II', 'Surf War', '06:10', 2005, 'spotify', ['Reapply']),
    createData('Applied', 'The Ziggens', 'Goin\' Richter', 'Pomona Lisa', '04:53', 1997, 'spotify', ['Challenge']),
    createData('Challenged', 'Slacktone', 'Tidal Wave', 'Another Album', '03:21', 2011, 'spotify', ['Accept', 'Reject']),
    createData('Accepted', 'The Revels', 'Church Key', 'Intoxical!!', '05:18', 1965, 'spotify', []),
    createData('Rejected', 'The Centurians', 'Bullwinkle pt.II', 'Surf War', '06:10', 2005, 'spotify', ['Reapply']),
    createData('Applied', 'The Ziggens', 'Goin\' Richter', 'Pomona Lisa', '04:53', 1997, 'spotify', ['Challenge']),
    createData('Challenged', 'Slacktone', 'Tidal Wave', 'Another Album', '03:21', 2011, 'spotify', ['Accept', 'Reject']),
    createData('Accepted', 'The Revels', 'Church Key', 'Intoxical!!', '05:18', 1965, 'spotify', []),
    createData('Rejected', 'The Centurians', 'Bullwinkle pt.II', 'Surf War', '06:10', 2005, 'spotify', ['Reapply']),
    createData('Applied', 'The Ziggens', 'Goin\' Richter', 'Pomona Lisa', '04:53', 1997, 'spotify', ['Challenge']),
    createData('Challenged', 'Slacktone', 'Tidal Wave', 'Another Album', '03:21', 2011, 'spotify', ['Accept', 'Reject']),

]

class SubGenreList extends Component {

    constructor(props){
        super(props);
        this.state = {
            genre: 'Rock',
            songs: [],
            totalDuration: '',
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
    
    /**
   * stream data from spotify if you have correct access token
   * @param {string} trackId 
   */
  playOnSpotify(trackId){
    if(localStorage.getItem('musicmap-spotify-user')){
     fetch(`https://api.spotify.com/v1/tracks/${trackId}`)
     .then(function(response) {
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
      this.getSpotifyAccessToken();
    }
   }

   getSpotifyAccessToken(){
    let clientId = 'f329b587614b4f97b8e2aadc26693dbc';
    let scopes = 'user-read-email';
    let redirect_uri = "https://warm-cove-80703.herokuapp.com/callback/?scope=user-read-email&state=12345";

    /*
https://accounts.spotify.coåm/authorize?response_type=token&client_id=f329b587614b4f97b8e2aadc26693dbc&scope=user-read-email&redirect_uri=https%3A%2F%2Fwarm-cove-80703.herokuapp.com%2Fcallback%2F%3Fscope%3Duser-read-email%26state%3D12345
    */
    let url = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + clientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri);
     window.location = url;
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
    componentDidMount(){
        this.setState({
            songs: [...rows],
            totalDuration : this.calculateTotalDuration(rows)
        })
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
                                <Typography className={classes.genreTitle} variant="h4" component="h2" gutterBottom>
                                Rock
                                </Typography>
                                <Typography variant="body2" component="p" classNames={classes.genreMetadata}>
                                {this.state.songs.length} songs &#8226; {this.state.totalDuration}
                                </Typography>
                            </Grid>
                            <Grid item>
                            <Switch value="checkedC" />
                            </Grid>
                            <Grid item className={classes.playGrid}>
                                <Button variant="contained" color="secondary" className={classes.playButton}>
                                    Play All
                                </Button>
                            </Grid>
                        </Grid>
                    </AppBar> 
                    
                    <Table className={classes.playlistTable}>
                        <TableHead>
                        <TableRow className={classes.playlistHeader}>
                            <TableCell>Play On</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell numeric>Year</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => {
                            return (
                            <TableRow className={classes.itemRow} key={row.id}>
                                <TableCell> <Icon onClick={this.getSpotifyAccessToken} className={classNames(classes.icon, 'fab fa-spotify fa-2x')} color="secondary" /></TableCell>
                               
                                <TableCell>{row.artist}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.album}</TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell numeric>{row.year}</TableCell>
                                <TableCell>
                                    <Chip  icon={<FaceIcon />} label={row.status} className={classes.statusChip} variant="outlined" />
                                </TableCell>
                               
                                <TableCell>
                                    {
                                        row.actions.map(action => {
                                            return (
                                                <Button key={action} size="small" variant="contained" color="secondary" className={classes.actionButton}>
                                                {action}
                                                </Button>
                                            );
                                        })
                                    }
                                
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </>
        );
    }
  
}

SubGenreList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubGenreList);