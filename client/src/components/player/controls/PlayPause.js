import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withMediaProps from '../decorators/with-media-props';
import { IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const buttonGradientBackground = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';

const styles = theme => ({
    icon: {
        '&:hover': {
          cursor: 'pointer'
        },
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
        color: buttonGradientBackground
      }
  });

class PlayPause extends Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.isPlaying !== media.isPlaying
  }

  _handlePlayPause = () => {
    this.props.media.playPause()
  }

  render() {
      {/* <button
        type="button"
        className={className}
        style={style}
        onClick={this._handlePlayPause}
      >
       
      </button>
     */}
    const { classes, media, css } = this.props
    return (
        <>
        {media.isPlaying ? 
        (<IconButton aria-label="Pause">
        <SvgIcon onClick={this._handlePlayPause} className={classes.icon} color='secondary'>
          <path d="M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
        </SvgIcon>
       </IconButton>)
       : (
        <IconButton aria-label="Play">
        <SvgIcon onClick={this._handlePlayPause} className={classes.icon} color='secondary'>
          <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z" />
        </SvgIcon>
       </IconButton>
       )
        }
      </>
    )
  }
}

export default withStyles(styles)(withMediaProps(PlayPause))