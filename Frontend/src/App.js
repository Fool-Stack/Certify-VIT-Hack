import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Login/SignupPage";
import EventPage from "./pages/EventPage/EventPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={SignupPage} />
				<Route exact path="/event/:id" component={EventPage} />
				<Route path="*" component={ErrorPage} />
			</Switch>
		</Router>
	);
}

export default App;
