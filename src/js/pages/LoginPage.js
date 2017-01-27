//js
import ES6Promise from 'es6-promise';
import alertify from 'alertify.js';
import 'whatwg-fetch';
import React from "react";
//own files
import Constants from '../values/constants';
import Strings from '../values/strings_de';
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
      name: this.state.name+Strings.kupMail,
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
          window.sessionStorage.displayName = res.displayName;
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
      <div style={style} class="jumbotron col-xs-6">
        <form class="form-signin">
          <h2 class="form-signin-heading">{Strings.login}</h2>
          <div class="input-group">
            <input type="text" class="form-control" placeholder={Strings.emailAdress} onChange={this.handleName} value={this.state.name}/>
            <div class="input-group-addon">{Strings.kupMail}</div>
          </div>
          <input type="password" class="form-control" placeholder={Strings.password} onChange={this.handlePassword} value={this.state.password}/>
          <br/>
          <button class="btn btn-primary" onClick={this.authenticate}>{Strings.login}</button>
        </form>
      </div>
		);
	}
}
