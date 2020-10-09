import { Grid } from "@material-ui/core";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import ReactTypingEffect from "react-typing-effect";

function Landing() {
	return (
		<div className="landing-page">
			<Navbar />
			<Grid container>
				<Grid item sm={12} md={6}>
					<div className="jumbo-div">
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
							platform
						</h1>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default Landing;
