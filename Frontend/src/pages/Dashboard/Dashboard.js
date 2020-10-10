import { Drawer } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loading from "../Loading/Loading";
import MyCertificates from "../MyCertificates/MyCertificates";
import "./Dashboard.css";

function Dashboard() {
	const [isLoggedIn, setLoggedIn] = useState(true);
	const [loading, setLoading] = useState(true);

	const [name, setName] = useState("");
	const [certificates, setCertificates] = useState([]);

	const [openDash, setOpenDash] = useState(1);

	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerWidth = 256;

	const getCertificates = async () => {};

	const dashboardSection = () => {
		if (openDash === 1) return <MyCertificates certs={certificates} />;
		else if (openDash === 2) return <MyEvents />;
	};

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			setLoggedIn(true);
			setName(localStorage.getItem("name"));
			getCertificates();
		} else setLoggedIn(false);
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
				<Sidebar
					name={name}
					setOpenDash={setOpenDash}
					openDash={openDash}
					setLoggedIn={setLoggedIn}
				/>
			</Drawer>
			<div className="dash-screen">
				{/* <h1>Dashboard {openDash}</h1> */}
				<MyCertificates certs={certificates} />
			</div>
		</div>
	);
}

export default Dashboard;
