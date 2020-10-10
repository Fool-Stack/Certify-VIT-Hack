import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./Loading.css";

function Loading() {
	return (
		<div className="loading-page">
			<CircularProgress color="secondary" />
		</div>
	);
}

export default Loading;
