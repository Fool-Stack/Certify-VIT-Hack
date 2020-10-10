import { Avatar, Divider, List, ListItem } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import ActionButton from "../ActionButton/ActionButton";
import "./Sidebar.css";

function Sidebar({ name, openDash, setOpenDash, setLoggedIn }) {
	const handleClick = (event) => {
		let newDash = event.target.id;
		if (newDash !== openDash) {
			setOpenDash(Number(newDash));
		}
	};

	const handleLogout = () => {
		localStorage.clear();
		setLoggedIn(false);
	};

	return (
		<div className="sidebar">
			<div className="side-profile-div">
				<Avatar
					alt={`${name} profile pic`}
					className="sidebar-avatar"
				/>
				<h3>{name}</h3>
			</div>
			<Divider light className="divider" />
			<div className="sidebar-menu">
				<List>
					<ListItem
						button
						className="sidebar-link"
						id="1"
						onClick={handleClick}
					>
						MY CERTIFICATES
					</ListItem>
					<ListItem
						button
						className="sidebar-link"
						id="2"
						onClick={handleClick}
					>
						MY EVENTS
					</ListItem>
					{/* <Divider light className="divider" /> */}
					<ListItem
						button
						className="sidebar-link"
						id="3"
						onClick={handleClick}
					>
						PROFILE
					</ListItem>
				</List>
				<div style={{ textAlign: "center", width: "100%" }}>
					<ActionButton onClick={handleLogout}>
						<ArrowBack style={{ marginRight: "5px" }} />
						Logout
					</ActionButton>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
