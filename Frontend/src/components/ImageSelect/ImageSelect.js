import { Grid } from "@material-ui/core";
import React from "react";
import "./ImageSelect.css";

function ImageSelect({selected, setSelected, images}) {
	return (
		<div className="image-select">
			<Grid container spacing={3}>
				{images.map(image => (
					<Grid item xs={6} className="img-container" style={{border: selected === image.key?"2px #5757ff solid": null}} onClick={() => setSelected(image.key)}>
						<img src={image.src} alt={image.name} className="img-preview" />
					</Grid>
				))}
			</Grid>
		</div>
	)
}

export default ImageSelect;