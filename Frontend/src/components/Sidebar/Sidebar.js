import { Avatar, Divider, List, ListItem } from "@material-ui/core";
import React from "react";
import "./Sidebar.css";

function Sidebar({ name }) {
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
					<ListItem button className="sidebar-link">
						MY CERTIFICATES
					</ListItem>
					<ListItem button className="sidebar-link">
						MY EVENTS
					</ListItem>
					{/* <Divider light className="divider" /> */}
					<ListItem button className="sidebar-link">
						PROFILE
					</ListItem>
				</List>
			</div>
		</div>
	);
}

export default Sidebar;
