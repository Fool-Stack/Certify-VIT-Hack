//Copy of Navbar.js

import React from "react";
import { AppBar, Avatar, Toolbar } from "@material-ui/core";
import "./DashNavbar.css";

function DashNavbar() {
	return (
		<AppBar position="static" className="navbar" elevation={0}>
			<Toolbar className="nav-toolbar">
				<img
					src="./assets/certify.svg"
					alt="brand logo"
					width={150}
					className="nav-logo"
				/>
				<div className="nav-menu nav-name-tag">
					Welcome Sarthak
					<Avatar
						alt="Sarthak profile pic"
						src="./assets/default.png"
						className="profile-avatar"
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default DashNavbar;
