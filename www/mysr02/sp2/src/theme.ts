import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

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
			main: '#00B588',
		},
		secondary: {
			main: '#556cd6',
		},
		error: {
			main: red.A400,
		},
		background: {
			default: '#fff',
		},
		warning: {
			main: '#ffc107',
		},
		info: {
			main: grey['600'],
		},
		success: {
			main: '#00B588',
		},
	},
	typography: {
		h2: {
			fontSize: '2.75rem',
		},
		fontSize: 13,
		// body2: {
		// 	fontSize: 13,
		// },
		// body1: {
		// 	fontSize: 13,
		// },
		// caption: {
		// 	fontSize: 13,
		// },
		// button: {
		// 	fontSize: 13,
		// },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
	},
});
