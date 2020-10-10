import { TextField, withStyles } from "@material-ui/core";

const TextInput = withStyles({
	root: {
		"& label": {
			color: "#dddddd",
		},
		"& label.Mui-focused": {
			color: "#5757ff",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#5757ff",
		},
		"& .MuiInputBase-input": {
			color: "#dddddd !important",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#dddddd",
				borderRadius: "50px",
			},
			"&:hover fieldset": {
				borderColor: "#5757ff",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#5757ff",
			},
		},
	},
})(TextField);

export default TextInput;
