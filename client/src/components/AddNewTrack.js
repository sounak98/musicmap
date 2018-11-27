import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Typography, TextField, 
    Button, Grid, Divider, SvgIcon, IconButton,
    Table, TableBody, TableCell, TableRow, Paper,
    TableHead, Checkbox } from '@material-ui/core';
import { throws } from 'assert';

const user = "whitedragon1234";
const styles = theme => ({
    paper: {
      margin: '0 auto',
      marginTop: theme.spacing.unit * 10,
      width: theme.spacing.unit * 100, 
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      overflowX: 'auto'
    },
    modal: {
        margin: '0 auto', 
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
    },
    trackTable: {
        marginTop: theme.spacing.unit * 5,
        overflowX: 'auto',
        height: theme.spacing.unit * 40
    },
    btnContainer: {
        margin: '0 auto'
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
        this.trackRow = React.createRef();
        this.state = {
            show: false,
            tracks: [],
            trackDetails: null,
            selectedTracks: [],
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

    calculateYear(releaseDate, releasePrecision = 'year'){
        if(releasePrecision != 'year'){
            let year = releaseDate.split('-')[0];
            return year;
        }
        
        return releaseDate;
    }

    handleNewTrackSubmission(e){
        e.preventDefault();
        console.log("Submit");
        console.log(this.state.trackDetails)
    }

    selectTrack(e){
        e.preventDefault();
        const selected = [...this.state.selectedTracks];
        const tracks = this.state.tracks;
        let index = selected.indexOf(e.currentTarget.id);
        //check if track is already in the list, if yes remove it else add it
        index != -1 ? selected.splice(index, 1) : selected.push(e.currentTarget.id);
        this.setState({
            selectedTracks: selected.slice(0)
        })
    }

    selectAllTracks(e){
        e.preventDefault();
        const {tracks , selectedTracks} = this.state;
        if(tracks.length === selectedTracks.length){
            this.setState({
                selectedTracks: []
            })
        }
        else {
            let selected = tracks.map(t => t.trackId);
            this.setState({
                selectedTracks: selected.slice(0)
            })
        }
        
    }

    fetchTrackDetails(e){
        if(this.handleUserTrackInput(e)){
            
            fetch(`http://localhost:4000/spotify/search?q=${this.spotifyTrackUri.current.value}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({
                    tracks: data.tracks.items.map(item =>  {
                        return {
                            trackId: item.id,
                            album: item.album.name,
                            title: item.name,
                            year: this.calculateYear(item.album.release_date, item.album.release_date_precision),
                            publisher: user,
                            provider: [{"name": "spotify", "uri": item.uri}],
                            artists: item.artists.map(artist => artist.name).join(', '),
                            duration: this.calculateTrackDuration(item.duration_ms)
                        }
                    }),
                    isValidationError: false
                })
            })
        }
    }

    submitTracks(e){
        e.preventDefault();
        const {tracks, selectedTracks} = this.state;
        let tracksToSend = tracks.map(t => {
            if(selectedTracks.indexOf(t.trackId) !== -1)
                return t;
        })
        tracksToSend = tracksToSend.filter(t => t);
        
        let _body = {};
        _body['tracks'] = tracksToSend.slice(0);

        const trackResp =  fetch('http://localhost:4000/track', {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(_body)
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

    renderTracksTable(classes){

        if(this.state.tracks.length == 0){
            return null;
        }
        let tracks = [...this.state.tracks];

        return (
            <div>
                <Paper elevation={0} className={classes.trackTable}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow
                            hover
                            onClick={this.selectAllTracks.bind(this)}  
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={this.state.tracks.length == this.state.selectedTracks.length} />
                                </TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Album</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Artists</TableCell>
                                <TableCell>Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {tracks.map(track => {
                            return (
                            <TableRow
                            id={track.trackId}
                            ref={this.trackRow}
                            key={track.trackId}
                            hover
                            onClick={this.selectTrack.bind(this)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox 
                                    checked={this.state.selectedTracks.indexOf(track.trackId) != -1 ? true : false} 
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                {track.title}
                                </TableCell>
                                <TableCell>{track.album}</TableCell>
                                <TableCell>{track.year}</TableCell>
                                <TableCell>{track.artists}</TableCell>
                                <TableCell>{track.duration}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                {this.renderButtons(classes)}
            </div>
            
            )
    }
    renderButtons(classes){
        return (
            <div className={classes.btnContainer}>
                <Button variant="contained" onClick={this.submitTracks.bind(this)} type="submit" color="secondary" className={classes.button}>
                    Submit
                </Button> 
                <Button variant="contained" onClick={this.handleClose.bind(this)} color="secondary" className={classes.button}>
                    Cancel
                </Button>  
            </div>
        )
    }

    /*renderTrackDetailsForm(classes){
        if(this.state.trackDetails === null){
            return null;
        }
         
        return (
            <form>
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
    }*/
    render() {
        const { classes } = this.props;

        return(
            <>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.show}
                >
                    <div className={classes.paper}>
                       <div className={classes.modal}>
                            {this.renderTitle(classes)}
                            {this.renderGetTrackDetailsForm(classes)}
                            {this.renderValidationError(classes)}
                            {this.renderTracksTable(classes)}
                            
                        </div>
                    </div>
                </Modal>
        </>
        )
    }

}

export default withStyles(styles)(AddNewTrack);