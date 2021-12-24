import { Container } from '@mui/material';

export const PosLayout = ({ children }: { children: React.ComponentElement<any, any> }) => {
	return (
		<Container maxWidth={'lg'}>
			{children}
		</Container>
	);
};
