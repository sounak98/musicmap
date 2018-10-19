import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Grid, IconButton, SvgIcon, Avatar, Typography} from '@material-ui/core';
import { Media, Player, controls } from './player';
import { rotatein } from 'react-animations';
import classNames from 'classnames';

const { PlayPause, CurrentTime, MuteUnmute, SeekBar, Progress, Volume, Duration} = controls

const buttonGradientBackground = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';

const styles = theme => ({
  '@keyframes rotatein': rotatein,
  playerContainer: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    height: theme.spacing.unit * 15,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    opacity: 1,
    color: 'black'
  },
  playerTopControlsContainer : {
    padding: '0'
  },
  playerTopControlsLeftContainer : {
    padding: '0',
    flex: 1.5,
  },
  playerTopControlsRightContainer : {
    padding: '0',
    flex: 1
  },
  playerBottomControlsContainer : {
    margin: '0 auto',
    padding: '0',
  },
  playerMainContainer: {
    boxShadow: '1px 1px 1.5px 1px'
  },
  ControlsMainContainer: {
    height: theme.spacing.unit * 15,
    flex: 3
  },
  playerAlbumInfoContainer: {
    height: theme.spacing.unit * 15,
    flex: 1
  },
  albumThumbnailContainer: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  playerTrackInfoContainer: {
    flex: 3
  },
  timer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: theme.spacing.unit * 1.8
  },
  volumeItem: {
    flex: 1
  },
  albumThumbnail: {
    width: 80,
    height: 80
  },
  albumAnimation: {
    animationName: 'rotatein',
    animationDuration: '0.2s',
  }
});

class MusicPlayer extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentTrack: {
        src: 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86',
        title: 'Cut To The Feeling',
        albumThumbnail: 'https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee',
        album: 'Cut To The Feeling',
        artist: 'Carly Rae Jepsen',
        year: '2017'
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
        <Paper className={classes.playerContainer} elevation={0}>
         <Media>
           <div>
          <div>
            <Player useAudioObject={true} vendor='audio' src={this.state.currentTrack.src} />
          </div>
         {/****** main player container *******/}
         <Grid container
          className={classes.playerMainContainer}
          direction='row' 
          justify='center'
          alignItems='center'>
          <Grid container
           className={classes.playerAlbumInfoContainer} 
           justify='center'
           alignItems='center'>
            <Grid item className={classes.albumThumbnailContainer} >
              <Avatar alt={this.state.currentTrack.album} 
              src={this.state.currentTrack.albumThumbnail} 
              className={classNames(classes.albumThumbnail, classes.albumAnimation)} />
            </Grid>
            <Grid container
            className={classes.playerTrackInfoContainer} 
            direction='column'
            justify='center'
            alignItems='flex-start'>
              <Grid item>
                <Typography variant="title">
                  {this.state.currentTrack.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subheading">
                  {this.state.currentTrack.artist}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subheading">
                  {this.state.currentTrack.year}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container 
         className={classes.ControlsMainContainer} 
         direction='row'
         justify='center'
         alignItems='center'>
            <Grid container 
              className={classes.playerTopControlsContainer}
              justify='center'
              direction='row'
              alignItems='center'>
              <Grid container 
              className={classes.playerTopControlsLeftContainer}
              justify='flex-end'
              alignItems='center'
              direction='row'>
              <Grid item>
                <IconButton aria-label="Shuffle" >
                  <SvgIcon className={classes.icon} color='secondary'>
                    <path d="M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z"/>
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="Previous" >
                  <SvgIcon className={classes.icon} color='secondary'>
                    <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z"/>
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item>
                <PlayPause css={classes.playButton}/>
              </Grid>
              <Grid item>
                <IconButton aria-label="Next" >
                  <SvgIcon className={classes.icon} color='secondary'>
                    <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z"/>
                  </SvgIcon>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="Loop" >
                  <SvgIcon className={classes.icon} color='secondary'>
                    <path d="M9,14V21H2V19H5.57C4,17.3 3,15 3,12.5A9.5,9.5 0 0,1 12.5,3A9.5,9.5 0 0,1 22,12.5A9.5,9.5 0 0,1 12.5,22H12V20H12.5A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5A7.5,7.5 0 0,0 5,12.5C5,14.47 5.76,16.26 7,17.6V14H9Z"/>
                  </SvgIcon>
                </IconButton>
              </Grid>
            </Grid>
              <Grid container 
              className={classes.playerTopControlsRightContainer}
              justify='flex-start'
              alignItems='center'
              direction='row'
              >
            <Grid item className={classes.volume}>
              <MuteUnmute css={null}/>
            </Grid>
            <Grid item className={classes.volume}>
              <Volume css={null}/>
            </Grid>
            </Grid>
            </Grid>
            <Grid container 
            className={classes.playerBottomControlsContainer}
            justify='center'
            alignItems='center'>
            <Grid item>
              <Typography variant="body2" component="p" className={classes.timer}><CurrentTime /> </Typography>
            </Grid>
            <Grid item>
              <SeekBar css={null}/>
            </Grid>
            <Grid item>
              <Typography variant="body2" component="p" className={classes.timer}> <Duration /></Typography>
            </Grid>
          </Grid>
         </Grid>
        </Grid>
      
        </div>
      </Media>
    </Paper>
  
    );
  }
  
}

MusicPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MusicPlayer);