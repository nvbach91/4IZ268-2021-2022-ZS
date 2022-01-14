import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
	palette: {
		primary: {
			main: '#00a687b8',
		},
		secondary: {
			main: '#ffffff5c',
		},
	// 	error: {
	// 		main: red.A400,
	// 	},
	// 	background: {
	// 		default: '#fff',
	// 	},
	// 	warning: {
	// 		main: '#ffc107',
	// 	},
	// 	info: {
	// 		main: grey['600'],
	// 	},
	// 	success: {
	// 		main: '#00B588',
	// 	},
	},
	typography: {
		h2: {
			fontSize: '2.75rem',
		},
		fontSize: 13,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
				contained: {
					borderRadius: '30px',
					padding: '10px 20px',
					fontSize: '1rem',
					border: 'solid 1px #0000004f',
				},
			},
		},
		MuiButtonGroup: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
	},
});
