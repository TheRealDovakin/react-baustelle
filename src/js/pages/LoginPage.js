//js
import ES6Promise from 'es6-promise';
import alertify from 'alertify.js';
import 'whatwg-fetch';
import React from "react";
//own files
import Constants from '../values/constants';
/**
 * @author Kasper Nadrajkowski
 * container for Info
 */
export default class LoginPage extends React.Component{
  constructor(){
    super();
    ES6Promise.polyfill();
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.callbackPath = '';
    this.state = {
      name: '',
      password: '',
    };
  }
  handleName(event){ this.setState({ name: event.target.value }); }
  handlePassword(event){ this.setState({ password: event.target.value }); }
  authenticate(){
    const json_data = JSON.stringify({
      name: this.state.name,
      password: this.state.password,
    });
    var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
    const self = this;
    fetch('http://172.22.23.6:3000/authenticate/', myInit).then(function(res){
			if(res.ok){
        res.json().then(function(res){
          window.sessionStorage.accessToken = res.token;
          document.location.href='#/'+self.callbackPath;
        });
      }
			else{
				console.log(res.json());
        alertify.error('Name und/ oder Password ist falsch');

			}
		});
  }
	render(){
    this.callbackPath = this.props.location.query.callbackPath;
    const style={marginTop: '60px'}
		return(
      <div style={style} class="jumbotron">
        <div class="container">
          <h1>Anmelden</h1>
          <span>Name:</span>
          <br/>
          <input type='text' onChange={this.handleName} value={this.state.name}     ></input>
          <br/>
          <span>Passwort:</span>
          <br/>
          <input type='password' onChange={this.handlePassword} value={this.state.password}></input>
          <br/>
          <p><a class="btn btn-primary" onClick={this.authenticate} role="button">Anmelden</a></p>
        </div>
      </div>
		);
	}
}
