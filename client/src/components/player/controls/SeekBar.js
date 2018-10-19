import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withMediaProps from '../decorators/with-media-props';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
      margin: theme.spacing.unit,
      '&:hover': {
        cursor: 'pointer'
      },
      width: theme.spacing.unit * 10,
      height: theme.spacing.unit * 10
    },
  slider: {
    width: theme.spacing.unit * 100,
    '&::-webkit-slider-thumb' : {
    '-webkit-appearance': 'none',
    appearance: 'none',
    width: theme.spacing.unit * 20,
    height: theme.spacing.unit * 20,
    backgroundColor: 'secondary',
    cursor: 'pointer'
    }
  }
});

class SeekBar extends Component {
  _isPlayingOnMouseDown = false
  _onChangeUsed = false

  shouldComponentUpdate({ media }) {
    return (
      this.props.media.currentTime !== media.currentTime ||
      this.props.media.duration !== media.duration
    )
  }

  _handleMouseDown = () => {
    this._isPlayingOnMouseDown = this.props.media.isPlaying
    this.props.media.pause()
  }

  _handleMouseUp = ({ target: { value } }) => {
    // seek on mouseUp as well because of this bug in <= IE11
    // https://github.com/facebook/react/issues/554
    if (!this._onChangeUsed) {
      this.props.media.seekTo(+value)
    }

    // only play if media was playing prior to mouseDown
    if (this._isPlayingOnMouseDown) {
      this.props.media.play()
    }
  }

  _handleChange = ({ target: { value } }) => {
    this.props.media.seekTo(+value)
    this._onChangeUsed = true
  }

  render() {
    const { classes, media } = this.props
    const { duration, currentTime } = media
    {/* (currentTime * 100 / duration) */}
    return (
      <input
        type="range"
        step="any"
        max={duration.toFixed(4)}
        value={currentTime}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        onChange={this._handleChange}
        className={classes.slider}
      />

       
    )
  }
}

export default withStyles(styles)(withMediaProps(SeekBar));