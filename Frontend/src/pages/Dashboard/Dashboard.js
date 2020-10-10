import { Drawer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loading from "../Loading/Loading";
import MyCertificates from "../MyCertificates/MyCertificates";
import MyEvents from "../MyEvents/MyEvents";
import "./Dashboard.css";

function Dashboard() {
	const [isLoggedIn, setLoggedIn] = useState(true);
	const [loading, setLoading] = useState(true);

	const [name, setName] = useState("");
	const [events, setEvents] = useState([]);

	const [openDash, setOpenDash] = useState(1);

	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerWidth = 256;

	const getCertificates = async () => {};

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			setLoggedIn(true);
			setName(localStorage.getItem("name"));
			getCertificates();
		} else setLoggedIn(false);
		setLoading(false);
	}, []);

	useEffect(() => {
		console.log(openDash);
	}, [openDash]);

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
				<Sidebar
					name={name}
					setOpenDash={setOpenDash}
					openDash={openDash}
					setLoggedIn={setLoggedIn}
				/>
			</Drawer>
			<div className="dash-screen">
				<TabPanel value={openDash} index={1}>
					<MyCertificates events={events} />
				</TabPanel>
				<TabPanel value={openDash} index={2}>
					<MyEvents events={events} />
				</TabPanel>
			</div>
		</div>
	);
}

export default Dashboard;

function TabPanel(props) {
	return (
		<div
			role="tabpanel"
			hidden={props.value !== props.index}
			id={`simple-tabpanel-${props.index}`}
			aria-labelledby={`simple-tab-${props.index}`}
			style={{ height: "100%" }}
		>
			<div>{props.children}</div>
		</div>
	);
}
