import {
	Container,
	Typography,
	Button,
	InputAdornment,
	IconButton,
	CircularProgress,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import Navbar from "../../components/Navbar/Navbar";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ActionButton from "../../components/ActionButton/ActionButton";
import axios from "axios";

function SignupPage() {
	const [name, setName] = useState("");
	const [email, changeEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailChanged, setEmailChanged] = useState(false);
	const [password, changePassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const [errorText, setErrorText] = useState(
		"Error Logging In! Try again...."
	);

	const [notVerified, setNotVerified] = useState(false);
	const [verifyMail, setVerifyMail] = useState("");

	const [isLoading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const mailErrorText = "Email cannot be empty";
	const passwordErrorText = "Password cannot be empty";

	const backend = process.env.REACT_APP_BACKEND_URL;

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

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

	const handleSubmit = async () => {
		setLoading(true);
		const url = `${backend}/user/signup`;
		console.log(url);

		let data = {
			name,
			email,
			password,
		};

		console.log(data);

		try {
			await axios.post(url, data).then((res) => {
				setLoading(false);
				setSuccess(true);
				console.log(res);
			});
		} catch (error) {
			setLoading(false);
			changePassword("");
			console.log(error);
		}
	};

	if (success) {
		return <Redirect to="/login" />;
	}

	return (
		<>
			<Navbar />
			<Container className="login-page">
				<Typography variant="h3" color="primary" className="login-head">
					Sign Up
				</Typography>
				<form className="form">
					<TextInput
						id="name"
						label="Name"
						type="text"
						className="form-input"
						variant="outlined"
						value={name}
						onChange={handleNameChange}
					></TextInput>
					<TextInput
						id="email"
						label="Email"
						type="email"
						className="form-input"
						variant="outlined"
						value={email}
						onChange={handleEmailChange}
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
				<div className="login-btn-div">
					<ActionButton
						className="login-btn"
						onClick={handleSubmit}
						disabled={isLoading ? true : false}
					>
						{!isLoading ? (
							"REGISTER"
						) : (
							<CircularProgress
								color="secondary"
								size={20}
								thickness={5}
							/>
						)}
					</ActionButton>
					<Typography
						variant="h6"
						color="primary"
						className="btn-seperator"
					>
						--- OR ---
					</Typography>
					<Link to={`/login`}>
						<ActionButton className="transparent-variant">
							LOGIN
						</ActionButton>
					</Link>
				</div>
			</Container>
		</>
	);
}

export default SignupPage;
