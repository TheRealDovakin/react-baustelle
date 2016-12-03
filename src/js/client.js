import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import Items from "./pages/Items";
import Layout from "./components/Layout";
import Places from "./pages/Places";


const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute path="/" component={Items}></IndexRoute>
			<Route path="places" component={Places}></Route>
			<Route path="items" component={Items}></Route>
		</Route>
	</Router>, 
	app);