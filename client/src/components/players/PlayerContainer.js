import React, { Component } from 'react';

class PlayerContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            playOn: 'spotify'
        }
    }

    play(){}
    pause(){}
    next(){}
    previous(){}
    volumeUp(){}
    volumeDown(){}
    mute(){}
    unmute(){}

    setPlayerInstance(){} //instantiate playerInstance for given source
    preparePlayerInstance(){} //authorize and token setting
    componentDidMount(){
        
    }

    render(){
        return(
            <div>Player Container</div>
        )
    }
}

export default PlayerContainer;