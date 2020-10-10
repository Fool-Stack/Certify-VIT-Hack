import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import "./EventItem.css";

function EventItem({ info, admin, link, id }) {
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
				{admin ? (
					<Link to={`/event/${id}`}>
						<ActionButton className="event-btn">
							View Event
						</ActionButton>
					</Link>
				) : (
					<ActionButton
						className="event-btn"
						download={true}
						link={link}
					>
						<span
							style={{
								fontSize: "0.8rem",
							}}
						>
							Download Certificate
						</span>
					</ActionButton>
				)}
			</div>
		</div>
	);
}

export default EventItem;
