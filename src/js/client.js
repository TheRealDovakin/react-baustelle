import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";


import Layout from "./components/Layout";
import Places from "./pages/Places";
import ProcessListPage from "./pages/ProcessListPage";
import ProcessView from "./pages/ProcessView";


const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute path="/" component={ProcessListPage}></IndexRoute>
			<Route path="Prozesse" component={ProcessListPage}></Route>
			<Route path="processView/" component={ProcessView}></Route>
			<Route path="processView/:id" component={ProcessView}></Route>
		</Route>
	</Router>, 
	app);