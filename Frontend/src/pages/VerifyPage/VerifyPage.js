import { Container, Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DashNavbar from "../../components/DashNavbar/DashNavbar";
import Navbar from "../../components/Navbar/Navbar";
import Loading from "../Loading/Loading";
import {Document, Page} from "react-pdf";
import "./VerifyPage.css";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function VerifyPage() {
	const [loading, setLoading] = useState(true);
	const [id, setId] = useState(null);
	const [redirect, setRedirect] = useState(false);
	const [details, setDetails] = useState(null);

	var navbar = null;
	const backend = process.env.REACT_APP_BACKEND_URL;

	const getQueryParams = () => {
		const query = window.location.search.substring(1);
		const vars = query.split("&");
		let code = null;
		let r = false;
		vars.map(det => {
			const sp = det.split("=");
			if(sp[0] === "id") {
				code = decodeURIComponent(sp[1]);
				setId(decodeURIComponent(sp[1]));
				r = true;
			} 
		})

		if(r) {
			getCertificate(code);

		}

		return r;
	}

	const nav = () => {
		if(localStorage.getItem("authToken")) {
			return <DashNavbar back={true}/>
		} else {
			return <Navbar />
		}
	}

	const getCertificate = async (code) => {
		let url = `${backend}/certificate/verify`;
		let data = {
			code: code
		}

		console.log(url, data);

		try {
			await Axios.post(url, data).then(res => {
				console.log(res.data);
				setDetails(res.data.certificateDoc);
			})
		} catch(error) {
			console.log(error);
		}	

		setLoading(false);
	}

	useEffect(() => {
		if(!getQueryParams()) {
			console.log("dssd");
			setLoading(false);
			setRedirect(true);
		}
	}, [])

	if(loading) {
		return <Loading />
	}

	else if(redirect) {
		return <Redirect to="/" />
	}

	return (
		<div className="verify-page">
			{nav()}
			<Container className="verify-page-section">
				<h1>This certificate is valid.</h1>
				<Grid container>
					<Grid item sm={12} md={8}>
						<Document file={details.certificate_link} >
							<Page pageNumber={1} style={{width: "100px"}}/>
						</Document>
					</Grid>
					<Grid item sm={12} md={4}>
					<h1 className="quiz-name-detail">{details.user_name}</h1>
							<h3 className="quiz-date-detail">
								{details.user_email}
							</h3>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default VerifyPage;