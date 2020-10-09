import { Grid } from "@material-ui/core";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import ReactTypingEffect from "react-typing-effect";
import ActionButton from "../../components/ActionButton/ActionButton";
import { ArrowForward } from "@material-ui/icons";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<div className="landing-page">
			<Navbar />
			<Grid container>
				<Grid item sm={12} md={6}>
					<div className="jumbo-div">
						<h1 className="jumbo-text sub-jumbo-text ">
							Tired of losing all your certficates?
						</h1>
						<h1 className="jumbo-text">
							All your certificates in one{" "}
							<span className="secondary-color">
								<ReactTypingEffect
									speed={100}
									typingDelay={500}
									eraseDelay={2000}
									eraseSpeed={100}
									text={["safe", "secure", "easy-to-use"]}
								/>
							</span>{" "}
							platform.
						</h1>
						<div className="jumbo-btn-div">
							<Link to="/login">
								<ActionButton>
									<span style={{ marginRight: "10px" }}>
										Start now
									</span>
									<ArrowForward />
								</ActionButton>
							</Link>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default Landing;
