import { Drawer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Loading from "../Loading/Loading";
import "./Dashboard.css";

function Dashboard() {
	const [isLoggedIn, setLoggedIn] = useState(true);
	const [loading, setLoading] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerWidth = 256;

	useEffect(() => {
		if (localStorage.getItem("authToken")) setLoggedIn(true);
		else setLoggedIn(false);
		setLoading(false);
	}, []);

	if (loading) {
		return <Loading />;
	}
	if (!isLoggedIn) {
		return <Redirect to="/" />;
	}

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
