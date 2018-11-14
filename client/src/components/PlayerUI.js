import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Grid, IconButton, SvgIcon, Avatar, Typography} from '@material-ui/core';
import { rotatein } from 'react-animations';
import classNames from 'classnames';
import { updateCurrentTrack } from '../actions/playerAction';


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
  playerVolumeSlider: {
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8
  },
  playerSeekbarSlider: {
    width: theme.spacing.unit * 50,
    '&::-webkit-slider-thumb' : {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: theme.spacing.unit * 20,
    height: theme.spacing.unit * 10,
    backgroundColor: 'secondary',
    cursor: 'pointer'
    }
    
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

class PlayerUI extends Component {  
  constructor(props){
    super(props);
    this.state = {
      isPlaying: false,
      isMuted: false,
      props: this.props
    }
  }

  _handlePlay(){
    this.props.play(this.props.currentTrack.trackId.spotify);
    this.setState({
      isPlaying: true
    })
  }

  _handlePause(){
    this.props.pause();
    this.setState({
      isPlaying: false
    })
  }


  render() {
    const { classes } = this.props;

    return (
        <Paper className={classes.playerContainer} elevation={0}>
         
           <div>
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
              <Avatar alt={this.props.currentTrack.album} 
              src={this.props.currentTrack.albumThumbnail} 
              className={classNames(classes.albumThumbnail, classes.albumAnimation)} />
            </Grid>
            <Grid container
            className={classes.playerTrackInfoContainer} 
            direction='column'
            justify='center'
            alignItems='flex-start'>
              <Grid item>
                <Typography variant="title">
                  {this.props.currentTrack.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subheading">
                  {this.props.currentTrack.artist}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subheading">
                  {this.props.currentTrack.year}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container 
         className={classes.ControlsMainContainer} 
         direction='column'
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
                {this.state.isPlaying ? 
                    (<IconButton aria-label="Pause">
                    <SvgIcon onClick={this._handlePause.bind(this)} className={classes.icon} color='secondary'>
                      <path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                    </SvgIcon>
                  </IconButton>)
                  : (
                    <IconButton aria-label="Play">
                    <SvgIcon onClick={this._handlePlay.bind(this)} className={classes.icon} color='secondary'>
                      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z" />
                    </SvgIcon>
                  </IconButton>
                  )
                }
              </Grid>
              <Grid item>
                <IconButton aria-label="Next" >
                  <SvgIcon onClick={this.props.updateCurrentTrack} className={classes.icon} color='secondary'>
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
              {this.state.isMuted ? 
                (<IconButton aria-label="Mute" >
                <SvgIcon onClick={this._handleMuteUnmute} color='secondary' className={classes.icon}>
                <path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                </SvgIcon>
              </IconButton>) 
              :
              (<IconButton aria-label="Unmute" >
              <SvgIcon onClick={this._handleMuteUnmute} color='secondary' className={classes.icon}>
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </SvgIcon>
              </IconButton>)  
              }
            </Grid>
            <Grid item className={classes.volume}>
                    <input
                type="range"
                step="any"
                min={0}
                max={1}
                value={0.5}
                onChange={this.props.volume}
                className={classes.playerVolumeSlider}
              />
            </Grid>
            </Grid>
            </Grid>
            <Grid container 
            className={classes.playerBottomControlsContainer}
            justify='center'
            alignItems='center'>
            <Grid item>
              <Typography variant="body2" component="p" className={classes.timer}>0:00 </Typography>
            </Grid>
            <Grid item>
                <input
                    type="range"
                    step="any"
                    max={100}
                    value={10}
                    className={classes.playerSeekbarSlider}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2" component="p" className={classes.timer}> 12:00</Typography>
            </Grid>
          </Grid>
         </Grid>
        </Grid>
      
        </div>
 
    </Paper>
  
    );
  }
  
}

const mapStateToProps = state => ({
    currentTrack: state.player.currentTrack
})

PlayerUI.propTypes = {
  classes: PropTypes.object.isRequired,
  currentTrack: PropTypes.object.isRequired,
  updateCurrentTrack:  PropTypes.func
};

export default connect(mapStateToProps, { updateCurrentTrack })(withStyles(styles)(PlayerUI));