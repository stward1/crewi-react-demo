import React, { Component } from 'react';
import Widget from './Widget';

//this class is going to be our main parent component for the one-page
export default class MainComponent extends Component {

    //this is the top-level state; we can put more stuff in here as needed
    state = {
        token: 1
    }

    updateToken = () => {
        this.setState({
            token: this.state.token + 1
        })
    }

    //renders out the login and widget components in parallel; they are siblings, so they have to use this main component as an intermediary to communicate
    render() {
        return(
            <div>
                <Widget token={this.state.token}></Widget>
                <button onClick={this.updateToken}>Update token</button>
            </div>
        )
    }
}



