import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<AppBar position="static" className="navbar">
			<Toolbar className="nav-toolbar">
				<Typography variant="h6" className="nav-head secondary-color">
					Certi.fy
				</Typography>
				<div className="nav-menu">
					<ul className="nav-links">
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
