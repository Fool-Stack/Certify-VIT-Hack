import React from "react";
import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

function Navbar() {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Menu />
				</IconButton>
				<Typography variant="h6">News</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
