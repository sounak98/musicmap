import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withMediaProps from '../decorators/with-media-props'
import { IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  icon: {
      margin: theme.spacing.unit
    }
  });


class MuteUnmute extends Component {
  shouldComponentUpdate({ media }) {
    return this.props.media.isMuted !== media.isMuted
  }

  _handleMuteUnmute = () => {
    this.props.media.muteUnmute()
  }

  render() {
     {/*<button
        type="button"
        className={className}
        style={style}
        onClick={this._handleMuteUnmute}
      >
        {media.isMuted ? 'Unmute' : 'Mute'}
      </button>
      */}
    const { classes, media } = this.props
    return (
      <>
      {media.isMuted ? 
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

      </>
     


    )
  }
}

export default withStyles(styles)(withMediaProps(MuteUnmute));