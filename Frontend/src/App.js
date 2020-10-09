import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
	return (
		<Router>
			<Route exact path="/" component={Landing} />
		</Router>
	);
}

export default App;
