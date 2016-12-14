import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";


import Layout from "./components/Layout";
import NewProcessPage from "./pages/NewProcessPage";
import Places from "./pages/Places";
import PhaseList from "./components/PhaseList";
import ProcessListPage from "./pages/ProcessListPage";
import ProcessView from "./pages/ProcessView";


const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute path="/" component={ProcessListPage}></IndexRoute>
			<Route path="/" component={ProcessListPage}></Route>
			<Route path="processView/:id" component={PhaseList}></Route>
			<Route path="newProcess" component={NewProcessPage}></Route>
		</Route>
	</Router>, 
	app);