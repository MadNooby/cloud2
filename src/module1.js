import React from "react";
import ReactDOM from "react-dom";
import {  Router, Route,hashHistory,IndexRoute } from 'react-router';

import Home from "./components/home/Home";
import Main from "./components/Main";
import Login from "./components/login/Login";
import Settings from "./components/settings/Settings";



const app=document.getElementById('app');
const app1=document.getElementById('login');




class App extends React.Component{

	constructor(){
		super();
		this.state={
			login:false
		}
	}

	render(){
		let x="";
		

		return(
			<Router history={hashHistory}>
        	  <Route  path="/" component={Main} >
        	  	<IndexRoute component={Home} />
        	  	<Route  path="home" component={Home} log={"s"}/>
        	  	<Route  path="settings" component={Settings} />
        	  </Route>
   		  	</Router>
			);
		};
}

class App1 extends React.Component{

	render(){
		return(
			<div>
				<Login />
			</div>
			);
	}


}


if(app)ReactDOM.render(<App />, app );
else if(app1)ReactDOM.render(<App1 />, app1 );
