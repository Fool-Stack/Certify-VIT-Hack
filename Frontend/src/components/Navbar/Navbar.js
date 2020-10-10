import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<AppBar position="static" className="navbar" elevation={0}>
			<Toolbar className="nav-toolbar">
				<Link to="/">
					<img
						src="./assets/certify.svg"
						alt="brand logo"
						width={150}
						className="nav-logo"
					/>
				</Link>
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
