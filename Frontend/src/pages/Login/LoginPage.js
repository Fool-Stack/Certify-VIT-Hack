import {
	Container,
	Typography,
	Button,
	InputAdornment,
	IconButton,
	Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import Navbar from "../../components/Navbar/Navbar";
import "./LoginPage.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ActionButton from "../../components/ActionButton/ActionButton";
import axios from "axios";

function LoginPage() {
	const [email, changeEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailChanged, setEmailChanged] = useState(false);
	const [password, changePassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const [didLogin, setDidLogin] = useState(null);
	const [errorText, setErrorText] = useState(
		"Error Logging In! Try again...."
	);
	const [redirect, setRedirect] = useState(false);
	const [ownerRedirect, setOwnerRedirect] = useState(false);
	const [loginRedirect, setLoginRedirect] = useState(false);

	const [notVerified, setNotVerified] = useState(false);
	const [verifyMail, setVerifyMail] = useState("");

	const [isLoading, setLoading] = useState(false);

	const mailErrorText = "Email cannot be empty";
	const passwordErrorText = "Password cannot be empty";

	const backend = process.env.REACT_APP_BACKEND_URL;

	const handleEmailChange = (event) => {
		setEmailChanged(true);
		changeEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPasswordChanged(true);
		changePassword(event.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const keyPress = (event) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		const url = `${backend}/`;
	};

	return (
		<>
			<Navbar />
			<Container className="login-page">
				<Typography variant="h3" color="primary" className="login-head">
					LOGIN
				</Typography>
				<form className="form">
					<TextInput
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"
						value={email}
					></TextInput>
					<br />
					<TextInput
						id="password"
						type={showPassword ? "text" : "password"}
						label="Password"
						className="form-input"
						variant="outlined"
						value={password}
						onChange={handlePasswordChange}
						onKeyPress={keyPress}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="show password"
										onClick={togglePasswordVisibility}
										edge="end"
										className="view-pass-icon"
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					></TextInput>
				</form>
				<br />
				<div className="login-btn-div">
					<ActionButton className="login-btn">LOGIN</ActionButton>
					<Typography
						variant="h6"
						color="primary"
						className="btn-seperator"
					>
						--- OR ---
					</Typography>
					<Link to={`/register`}>
						<ActionButton className="transparent-variant">
							Register
						</ActionButton>
					</Link>
				</div>
			</Container>
		</>
	);
}

export default LoginPage;
