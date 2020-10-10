import { Drawer } from "@material-ui/core";
import React, { useState } from "react";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import "./Dashboard.css";

function Dashboard() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerWidth = 256;

	return (
		<div
			className="dashboard-page"
			style={{ marginLeft: drawerOpen ? `${drawerWidth}px` : 0 }}
		>
			<DashNavbar open={drawerOpen} setOpen={setDrawerOpen} />
			<Drawer
				variant="persistent"
				anchor="left"
				open={drawerOpen}
				className="dash-drawer"
				style={{ width: `${drawerWidth}px` }}
			>
				<h1>Hello</h1>
			</Drawer>
			<div className="dash-screen">
				<h1>Dashboard</h1>
			</div>
		</div>
	);
}

export default Dashboard;
