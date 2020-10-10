import React from "react";
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
				) : null}
			</div>
		</div>
	);
}

export default MyCertificates;
