import React from "react";
import ActionButton from "../ActionButton/ActionButton";
import "./EventItem.css";

function EventItem({ info }) {
	return (
		<div className="event-item">
			<div className="event-detail">
				<div className="event-name-section">
					<span className="event-name-span">NAME</span>
					<p className="event-name-detail">{info.event_id.name}</p>
				</div>
				<div className="event-name-section">
					<span className="event-name-span">DATE</span>
					<p className="event-name-detail">
						{new Date(info.event_id.date).toLocaleDateString()}
					</p>
				</div>
			</div>
			<div className="event-btn-section">
				<ActionButton className="event-btn">View Event</ActionButton>
			</div>
		</div>
	);
}

export default EventItem;
