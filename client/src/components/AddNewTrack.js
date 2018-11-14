import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Modal, Typography, TextField, Button, Grid, Divider } from '@material-ui/core';

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
      margin: '0 auto',
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
    },
    trackDetailsDivider: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
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
            trackDetails: null
        }
        this.spotifyTrackUri = React.createRef();
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    
    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.state.show){
            this.setState({
                show:nextProps.show
            })
        }
    }

    fetchTrackDetails(){
        console.log(this.spotifyTrackUri.current.value)
        fetch(`http://localhost:4000/spotify/track/${this.spotifyTrackUri.current.value}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                trackDetails: data
            })
        })
        
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
    renderForm(classes){
        return (
            <div className={classes.form}>
                <Grid container>
                    <Grid item className={classes.formContainer}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="spotify-uri"
                                label="Spotify Track Uri"
                                className={classes.trackUriText}
                                name="spotifyUri"
                                margin="none"
                                inputRef={this.spotifyTrackUri}
                                />
                        </form>
                    </Grid>
                    <Grid item className={classes.getTrackBtn}>
                        <Button variant="contained" onClick={this.fetchTrackDetails.bind(this)} color="secondary" className={classes.getTrackButton}>
                        Get Track Details
                        </Button>
                    </Grid>
                </Grid>
            
                
            </div>
                   
        )
    }

    renderButtons(classes){
        return (
            <div className={classes.btnContainer}>
                <Button variant="contained" onClick={this.fetchTrackDetails.bind(this)} color="secondary" className={classes.button}>
                    Submit
                </Button> 
                <Button variant="contained" onClick={this.handleClose.bind(this)} color="secondary" className={classes.button}>
                    Cancel
                </Button>  
            </div>
        )
    }

    calculateTrackDuration(durationInMs){
        let min = parseInt((durationInMs/1000) / 60);
        let sec = parseInt((durationInMs/1000) % 60);
       return `${parseInt(min / 10) == 0 ? `0${min}` : min}:${parseInt(sec / 10) == 0 ? `0${sec}` : sec}`; 
    }

    renderTrackDetails(classes){
        if(this.state.trackDetails === null){
            return null;
        }
         
        return (
            <div className={classes.trackDetailsContainer}>
                <Divider className={classes.trackDetailsDivider}/>
                <TrackField className={classes.TrackDetailsTextField} label="Album">
                    {this.state.trackDetails.album.name}
                </TrackField>
                <TrackField className={classes.TrackDetailsTextField} label="Year">
                    {this.state.trackDetails.album['release_date']}
                </TrackField>
                <TrackField className={classes.TrackDetailsTextField} label="Artist">
                    {this.state.trackDetails.artists.map(artist => artist.name).join()}
                </TrackField>
                <TrackField className={classes.TrackDetailsTextField} label="Track">
                    {this.state.trackDetails.name}
                </TrackField>
                <TrackField className={classes.TrackDetailsTextField} label="Duration">
                    {this.calculateTrackDuration(this.state.trackDetails['duration_ms'])}
                </TrackField>
                <Divider className={classes.trackDetailsDivider}/>
            </div>
        )
    }
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
                        {this.renderTitle(classes)}
                        {this.renderForm(classes)}
                        {this.renderTrackDetails(classes)}
                        {this.renderButtons(classes)}
                    </div>
                </Modal>
        </>
        )
    }

}

export default withStyles(styles)(AddNewTrack);