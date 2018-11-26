import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Typography, TextField, Button, Grid, Divider, SvgIcon, IconButton } from '@material-ui/core';

const styles = theme => ({
    paper: {
      margin: '0 auto',
      marginTop: theme.spacing.unit * 10,
      width: theme.spacing.unit * 70,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    titleContainer:{
      margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
      paddingBottom: theme.spacing.unit * 2
    },
    formContainer: {
        padding: 0
    },
    getTrackBtn: {
       marginLeft: theme.spacing.unit * 2,
    },
    button: {
        margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px 0 0`,
    },
    getTrackButton: {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 0`,
    },
    form: {
        margin: '0 auto'
    },
    TrackDetailsTextField: {
        paddingRight: theme.spacing.unit * 2
    },
    trackDetailsContainer: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
        backgroundColor: '#FBFBFB'
    },
    trackDetailsDivider: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
    },
    errorContainer: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
    },
    icon: {
        margin: theme.spacing.unit
    }
});


const TrackField = (props) => {
    return (
            <TextField
                id="album"
                label={props.label}
                defaultValue={props.children}
                className={props.className}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
    )
    
}
class AddNewTrack extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            trackDetails: null,
            isValidationError: false
        }
        this.spotifyTrackUri = React.createRef();
    }

    handleClose = () => {
        this.setState({ show: false, trackDetails: null });
    };

    
    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.state.show){
            this.setState({
                show:nextProps.show
            })
        }
    }
    handleUserTrackInput(e){
        e.preventDefault();
        console.log(this.spotifyTrackUri.current.value)
        if(this.spotifyTrackUri.current.value == ''){
            console.log("Track Id is required field")
            this.setState({isValidationError: true})
            return false;
        }
        return true;
    }

    calculateTrackDuration(durationInMs){
        let min = parseInt((durationInMs/1000) / 60);
        let sec = parseInt((durationInMs/1000) % 60);
       return `${parseInt(min / 10) == 0 ? `0${min}` : min}:${parseInt(sec / 10) == 0 ? `0${sec}` : sec}`; 
    }

    handleNewTrackSubmission(e){
        e.preventDefault();
        console.log("Submit");
        console.log(this.state.trackDetails)
    }

    fetchTrackDetails(e){
        if(this.handleUserTrackInput(e)){
            
            fetch(`http://localhost:4000/spotify/search?q=${this.spotifyTrackUri.current.value}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    trackDetails: data.tracks.items[0],
                    isValidationError: false
                })
            })
        }
    }

    addTrack(e){
        e.preventDefault();
        let track = {}
        track.album = this.state.trackDetails.album.name;
        track.title = this.state.trackDetails.name;
        track.year = this.state.trackDetails.album['release_date'];
        track.publisher = "testUser";
        track.provider = [];
        track.provider.push({"name": "spotify", "uri": this.state.trackDetails.uri});
        track.artists = this.state.trackDetails.artists.map(artist => artist.name).join();
        track.duration = this.calculateTrackDuration(this.state.trackDetails['duration_ms']);

        const trackResp =  fetch('http://localhost:4000/track', {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: track
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        
    }
    renderValidationError(classes){
        if(!this.state.isValidationError){
            return null;
        }
        return (
            <div className={classes.errorContainer}>
                <Typography variant="subtitle2" color="secondary" className={classes.validationErrorText}>
                Track Id is a required field
                </Typography>
            </div>
        )
    }
    renderCloseButton(classes){
        return (
            <div className={classes.closeButton}>
                <IconButton aria-label="Close">
                    <SvgIcon onClick={this.handleClose.bind(this)} className={classes.icon} color='secondary'>
                        <path opacity=".87" fill="none" d="M0 0h24v24H0V0z"/>
                        <path opacity=".3" d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 11.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>                   
                    </SvgIcon>
                </IconButton>
            </div>
        )
    }
    renderTitle(classes){
        return(
            <div className={classes.titleContainer}>
                <Typography variant="h5" id="modal-title" >
                    Add New Track
                </Typography>
            </div>
        )
       
    }
    renderGetTrackDetailsForm(classes){
        return (
            <form onSubmit={this.fetchTrackDetails.bind(this)}>
                <div className={classes.form}>
                    <Grid container>
                        <Grid item className={classes.formContainer}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    required
                                    autoFocus
                                    fullWidth
                                    id="spotify-uri"
                                    label="Search in Spotify"
                                    className={classes.trackUriText}
                                    name="spotifyUri"
                                    margin="none"
                                    inputRef={this.spotifyTrackUri}
                                    onBlur={this.handleUserTrackInput.bind(this)}
                                    />
                            </form>
                        </Grid>
                        <Grid item className={classes.getTrackBtn}>
                            <Button variant="contained"
                                color="secondary" 
                                className={classes.getTrackButton}
                                type="submit">
                            Get Track Details
                            </Button>
                        </Grid>
                    </Grid>    
                </div>
            </form>
                   
        )
    }

    renderButtons(classes){
        return (
            <div className={classes.btnContainer}>
                <Button variant="contained" type="submit" color="secondary" className={classes.button}>
                    Submit
                </Button> 
                <Button variant="contained" onClick={this.handleClose.bind(this)} color="secondary" className={classes.button}>
                    Cancel
                </Button>  
            </div>
        )
    }

    renderTrackDetailsForm(classes){
        if(this.state.trackDetails === null){
            return null;
        }
         
        return (
            <form onSubmit={this.addTrack.bind(this)}>
                <div className={classes.trackDetailsContainer}>
                    <Divider className={classes.trackDetailsDivider}/>
                    <TrackField className={classes.TrackDetailsTextField} label="Album">
                        {this.state.trackDetails.album.name}
                    </TrackField>
                    <TrackField className={classes.TrackDetailsTextField} label="Year">
                        {this.state.trackDetails.album['release_date'].split('-')[0]}
                    </TrackField>
                    <TrackField className={classes.TrackDetailsTextField} label="Artist">
                        {this.state.trackDetails.artists.map(artist => artist.name).join(', ')}
                    </TrackField>
                    <TrackField className={classes.TrackDetailsTextField} label="Title">
                        {this.state.trackDetails.name}
                    </TrackField>
                    <TrackField className={classes.TrackDetailsTextField} label="Track #">
                        {this.state.trackDetails['track_number']}
                    </TrackField>
                    <TrackField className={classes.TrackDetailsTextField} label="Duration">
                        {this.calculateTrackDuration(this.state.trackDetails['duration_ms'])}
                    </TrackField>
                    <Divider className={classes.trackDetailsDivider}/>
                </div>
                {this.renderButtons(classes)}
            </form>
        )
    }
    render() {
        console.log("Rendered.........")
        const { classes } = this.props;

        return(
            <>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.show}
                >
                    <div className={classes.paper}>
                       
                        {this.renderTitle(classes)}
                        {this.renderGetTrackDetailsForm(classes)}
                        {this.renderValidationError(classes)}
                        {this.renderTrackDetailsForm(classes)}
                    </div>
                </Modal>
        </>
        )
    }

}

export default withStyles(styles)(AddNewTrack);