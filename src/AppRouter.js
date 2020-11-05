import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ChatRoom from './components/ChatRoom/ChatRoom'
import JoinRoom from './components/JoinRoom/JoinRoom'

export default class AppRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/chat"} component={ChatRoom} />
                    <Route path="/" component={JoinRoom} />
                </Switch>
            </Router>
        )
    }
}