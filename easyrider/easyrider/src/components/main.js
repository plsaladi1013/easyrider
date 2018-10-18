// {/*Setting up Main Component to render React Routes for every Page/Link*/}
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login.js'; 
import Registration from '../pages/Registration.js'; 
import Home from '../pages/Home.js'; 
//Components

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/Register' component={Registration}></Route>
                <Route exact path='/Home' component={Home}></Route> 
            </Switch>
        )
    }
}


