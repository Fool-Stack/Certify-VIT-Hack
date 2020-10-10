import { Grid } from "@material-ui/core";
import React from "react";
import EventItem from "../../components/EventItem/EventItem";
import "./MyCertificates.css";

function MyCertificates({ events }) {
	return (
		<div className="certificates-section">
			<h1 className="section-heading">
				<span style={{ borderBottom: "3px white solid" }}>
					MY CERTIFICATES
				</span>
			</h1>
			<div className="certificate-list">
				{events.length === 0 ? (
					<h3 className="no-cert">
						You do not have any certificates right now!
					</h3>
				) : (
					<Grid container>
						{events.map((event) => (
							<Grid item sm={6} md={4}>
								<EventItem
									info={event}
									admin={false}
									link={event.certificate_link}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</div>
		</div>
	);
}

export default MyCertificates;
