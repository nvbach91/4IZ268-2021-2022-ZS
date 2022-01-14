import { AppBar, Box, Button, ButtonGroup, Container, Grid, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAppContext } from '../src/connectionManager';

export const PosLayout = ({ children }: { children: React.ComponentElement<any, any> }) => {
	const { restaurant, disconnect } = useAppContext();
	const router = useRouter();
	if (restaurant === null) {
		router.push('/');
		return <></>;
	}
	// assertNotNull(restaurant);
	return (
		<>
			<AppBar
				position='relative'
				color="secondary"
			>
				<Box p={1}>
					<Grid container justifyContent={'space-between'}>
						<Grid item>
							<Link href={'/'}>
								<IconButton onClick={disconnect}>
									<ArrowBackIcon />
								</IconButton>
							</Link>
						</Grid>
						<Grid item>
							<Typography variant={'h6'}>{restaurant.name}</Typography>
						</Grid>
						<Grid item>

						</Grid>
					</Grid>
				</Box>
			</AppBar>
			<Container maxWidth={'lg'}>
				<Box my={3} display={'flex'} justifyContent={'center'}>
					<ButtonGroup variant={'contained'}>
						<Button color={router.pathname === '/pos' ? 'primary' : 'secondary'} onClick={() => router.push('/pos')}>
							Tables
						</Button>
						<Button color={router.pathname === '/pos/bill' ? 'primary' : 'secondary'} onClick={() => router.push('/pos/bill')}>
							Bills
						</Button>
					</ButtonGroup>
				</Box>
				{children}
			</Container>
		</>
	);
};
