import {
	CircularProgress,
	Dialog,
	Fab,
	Grid,
	TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Add } from "@material-ui/icons";
import "./MyEvents.css";
import TextInput from "../../components/TextInput/TextInput";
import ActionButton from "../../components/ActionButton/ActionButton";
import axios from "axios";
import EventItem from "../../components/EventItem/EventItem";

function MyEvents({ events, setRefresh }) {
	const [eventModal, setEventModal] = useState(false);

	const [newEventName, setEventName] = useState("");
	const [newEventDate, setEventDate] = useState("2020-10-08");
	const [accessCode, setAccessCode] = useState("");

	const [loading, setLoading] = useState(false);

	const backend = process.env.REACT_APP_BACKEND_URL;

	const onCloseHandle = () => setEventModal(false);

	const clearModal = () => {
		setEventDate(null);
		setEventName("");
		setAccessCode("");
	};

	const handleNameChange = (e) => {
		setEventName(e.target.value);
	};

	const handleDateChange = (e) => {
		console.log(e.target.value);
		setEventDate(e.target.value);
	};

	const handleAccessCode = (e) => {
		setAccessCode(e.target.value);
	};

	const handleEventAdd = async () => {
		const url = `${backend}/event/add`;
		let token = localStorage.getItem("authToken");

		setLoading(true);

		const data = {
			name: newEventName,
			date: newEventDate,
			secret: accessCode,
		};

		try {
			await axios
				.post(url, data, {
					headers: {
						"auth-token": token,
					},
				})
				.then((res) => {
					console.log(res);
					setLoading(false);
					setRefresh(true);
					onCloseHandle();
					clearModal();
				});
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="events-section">
			<h1 className="section-heading">
				<span style={{ borderBottom: "3px white solid" }}>
					MY EVENTS
				</span>
			</h1>
			<div className="certificate-list">
				{events.length === 0 ? (
					<h3 className="no-cert">
						You do not have any events... Create one right now!
					</h3>
				) : (
					<Grid container>
						{events.map((event) => (
							<Grid item sm={6} md={4}>
								<EventItem info={event} admin={true} />
							</Grid>
						))}
					</Grid>
				)}
			</div>
			<Fab
				color="primary"
				className="add-event-btn"
				onClick={() => setEventModal(true)}
			>
				<Add />
			</Fab>
			<Dialog
				open={eventModal}
				onClose={onCloseHandle}
				aria-labelledby="add-event-modal"
				PaperProps={{
					style: {
						backgroundColor: "black",
						color: "white",
						minWidth: "40%",
					},
				}}
				style={{ width: "100%" }}
			>
				<div className="add-event-section">
					<h1 style={{ color: "#5757ff", marginBottom: "10%" }}>
						ADD AN EVENT
					</h1>
					<div className="add-event-form">
						<TextInput
							variant="outlined"
							label="Event Name"
							value={newEventName}
							onChange={handleNameChange}
						/>
						<TextField
							label="Event Date"
							type="date"
							defaultValue="2020-10-08"
							style={{
								backgroundColor: "rgb(31, 31, 31)",
								marginTop: "5%",
								marginRight: "2%",
								marginLeft: "2%",
								paddingLeft: "15px",
								paddingRight: "15px",
							}}
							className="date-picker"
							value={newEventDate}
							onChange={handleDateChange}
						/>
						<TextInput
							variant="outlined"
							label="Access Code"
							style={{ marginTop: "5%", marginBottom: "10%" }}
							value={accessCode}
							onChange={handleAccessCode}
						/>
						<ActionButton onClick={handleEventAdd}>
							{!loading ? (
								"ADD EVENT"
							) : (
								<CircularProgress
									color="secondary"
									size={20}
									thickness={5}
								/>
							)}
						</ActionButton>
					</div>
				</div>
			</Dialog>
		</div>
	);
}

export default MyEvents;
