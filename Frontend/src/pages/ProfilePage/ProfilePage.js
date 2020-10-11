import Axios from "axios";
import React from "react";

function ProfilePage() {
	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState(null);

	const backend = process.env.REACT_APP_BACKEND_URL;

	const getDetails = async () => {
		let url = `${backend}/user/me`;
		let token = localStorage.getItem("authToken");

		try {
			await Axios.get(url, {
				headers: {
					"auth-token": token,
				}
			}).then(res => {
				setDetails(res.data);
				setLoading(false);
			})
		} catch(error) {
			console.log(error);
		}
	}


	useEffect(() => {
		getDetails();
	}, [])


	return (
		<div className="profile-section">
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
								{details.email}
							</h3>
						</div>
						<div className="event-certs-header">
							EVENTS CREATED <br />
							<span className="certs-generated">
								{details.events.length}
							</span>
						</div>
					</div>
				</div>
		</div>
	);
}

export default Profile;