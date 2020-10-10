import { Button } from "@material-ui/core";
import React from "react";
import "./ActionButton.css";

function ActionButton(props) {
	return (
		<Button variant="contained" className={`${props.className} action-btn`}>
			{props.children}
		</Button>
	);
}

export default ActionButton;
