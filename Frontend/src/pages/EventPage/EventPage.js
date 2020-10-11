import {
	CircularProgress,
	Container,
	Dialog,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { Add, AddCircle, GetApp } from "@material-ui/icons";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Loading from "../Loading/Loading";
import "./EventPage.css";
import Dropzone from "react-dropzone";
import ImageSelect from "../../components/ImageSelect/ImageSelect";
import {templates} from "../../templates/templates";

function EventPage(props) {
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState(null);

	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [selected, setSelected] = useState(1);

	const [submitLoading, setSubmitLoading] = useState(false);

	const id = props.match.params.id;
	const backend = process.env.REACT_APP_BACKEND_URL;


	const onCloseHandle = () => {
		setOpen(false);
	};

	const handleFileDrop = (acceptedFiles) => {
		setFile(acceptedFiles[0]);
	};

	const handleSubmit = async () => {
		setSubmitLoading(true);
		let data = new FormData();
		data.append("file", file);
		data.append("templateNumber", selected);
		data.append("event_id", id);

		let url = `${backend}/event/certificates`;
		let token = localStorage.getItem("authToken");

		// for (var pair of data.entries()) {
		// 	console.log(pair[0] + " " + pair[1]);
		// }

		try {
			await Axios.post(url, data, {
				headers: {
					"auth-token": token,
					"Content-Type": "multipart/form-data",
				},
			}).then((res) => {
				console.log(res);
				getDetails();
				setSubmitLoading(false);
				setFile(null);
				onCloseHandle();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getDetails = async () => {
		let url = `${backend}/event/${id}`;

		try {
			await Axios.get(url).then((res) => {
				console.log(res.data);
				setDetails(res.data.event);
				setLoading(false);
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDetails();
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="event-details-page">
			<DashNavbar back={true} />
			<Container>
				<h1 className="section-heading">
					<span style={{ borderBottom: "3px white solid" }}>
						Event Details
					</span>
				</h1>
				<div className="event-details-section">
					<div className="event-page-header">
						<div className="event-details-header">
							<h1 className="quiz-name-detail">{details.name}</h1>
							<h3 className="quiz-date-detail">
								{new Date(details.date).toLocaleDateString()}
							</h3>
						</div>
						<div className="event-certs-header">
							CERTIFICATES GENERATED <br />
							<span className="certs-generated">
								{details.participants.length}
							</span>
						</div>
					</div>
					<Divider light className="divider-1" />
					<div className="event-participants">
						<h1 className="section-heading">
							<span style={{ borderBottom: "3px white solid" }}>
								Participants
							</span>
						</h1>
						<div className="participant-btn-bar">
							<ActionButton onClick={() => setOpen(true)}>
								Add Participant <Add />
							</ActionButton>
						</div>
						<div className="participants-list">
							{details.participants.length === 0 ? (
								<h3 className="no-cert">
									There are currently no participants.
								</h3>
							) : (
								<List>
									{details.participants.map((participant) => (
										<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} className="participant-item">
											<ListItem>
												<ListItemText
													primary={
														participant.participant_name.toUpperCase()
													}
													secondary={`Email: ${participant.participant_email}`}
												/>
											</ListItem>
											<ActionButton download={true} link={participant.certificate_link}><GetApp /></ActionButton>
										</div>
									))}
								</List>
							)}
						</div>
					</div>
				</div>
			</Container>
			<Dialog
				open={open}
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
				<div className="add-participants-modal">
					<div className="template-zone">
						<h3>Select a template: </h3>
						<ImageSelect images={templates} selected={selected} setSelected={setSelected} />
					</div>
					<div className="dropzone">
						<h3>Upload a file: </h3>
						<Dropzone
							onDrop={(acceptedFiles) =>
								handleFileDrop(acceptedFiles)
							}
						>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<AddCircle className="drop-icon" />
										<p
											style={{
												color: "rgb(160, 160, 160)",
											}}
										>	
										{file? `Selected file: ${file.name}`
										: "Drag 'n' drop or click to select a CSV file"
										}
										</p>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className="add-participants-btn">
						<ActionButton onClick={handleSubmit}>
							{!submitLoading ? (
								"CONFIRM"
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

export default EventPage;
