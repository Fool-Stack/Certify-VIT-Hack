import { Container } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Loading from "../Loading/Loading";

function EventPage(props) {
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState(null);
	const id = props.match.params.id;
	const backend = process.env.REACT_APP_BACKEND_URL;

	const getDetails = async () => {
		let url = `${backend}/event/${id}`;

		try {
			await Axios.get(url).then((res) => {
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
				<h1>Hello {id}</h1>
			</Container>
		</div>
	);
}

export default EventPage;
