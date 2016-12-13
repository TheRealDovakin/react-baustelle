import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import ProcessView from "./pages/ProcessView";
import Layout from "./components/Layout";
import Places from "./pages/Places";


const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute path="/" component={ProcessView}></IndexRoute>
			<Route path="places" component={Places}></Route>
			<Route path="processView/" component={ProcessView}></Route>
			<Route path="processView/:id" component={ProcessView}></Route>
		</Route>
	</Router>, 
	app);