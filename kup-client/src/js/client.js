//js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory} from "react-router";

//own files
import CreatedProcessPage from "./pages/CreatedProcessPage";
import InfoPage from "./pages/InfoPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import ProcessNotFoundPage from "./pages/ProcessNotFoundPage";
import ProcessListPage from "./pages/ProcessListPage";
import ProcessPage from "./pages/ProcessPage";
import ServerUnreachablePage from "./pages/ServerUnreachablePage";

/**
 * @author Kasper Nadrajkowski
 * react router
 */

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={ProcessListPage}></IndexRoute>
			<Route path="/" component={ProcessListPage}></Route>
			<Route path="processPage/:id" component={ProcessPage}></Route>
			<Route path="newProcess" component={CreatedProcessPage}></Route>
			<Route path="createdProcess/:id" component={CreatedProcessPage}></Route>
			<Route path="info" component={InfoPage}></Route>
			<Route path="processNotFound" component={ProcessNotFoundPage}></Route>
			<Route path="serverUnreachable" component={ServerUnreachablePage}></Route>
			<Route path="login" component={LoginPage}></Route>
		</Route>
	</Router>,
app);
