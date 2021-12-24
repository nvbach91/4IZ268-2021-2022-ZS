import {
	Badge,
	Box,
	Button, CircularProgress, Fade,
	List,
	ListItem, ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	TextField,
} from '@mui/material';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { VpnKey } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useAppContext } from '../src/connectionManager';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,
		maxWidth: 600,
		marginLeft: 'auto',
		marginRight: 'auto',
		position: 'relative',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	badge: {
		top: '32%',
		right: '20%',
	},
}));

enum STATE {
	APIKEYS,
	LOADING,
	SUCCESS,
	FAILED,
}

const IndexPage = () => {
	const classes = useStyles();
	const c = useAppContext();
	const apiKeys = JSON.parse(localStorage.getItem('apiKeys') || '[]') as ({ apiKey: string; restaurant: string })[];
	const [ state, setState ] = useState<STATE>(STATE.APIKEYS);
	const applyApiKey = useCallback(async (apiKey: string, isNew = false) => {
		setState(STATE.LOADING);
		const result = await c.connect([ apiKey ]);
		console.log('result = ', result);
		if (result === false) {
			setState(STATE.APIKEYS);
			return;
		}
		if (isNew) {
			localStorage.setItem('apiKeys', JSON.stringify([ ...apiKeys, { apiKey, name: 'Restaurant name' } ]));
		}
		setState(STATE.SUCCESS);
	}, [ apiKeys, c ]);
	return (
		<Fade
			in={true}
			timeout={1000}
			unmountOnExit
		>
			<Paper className={classes.paper}>
				{state !== STATE.APIKEYS && <Box mt={-2} width={1} height={1} position={'absolute'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
					{state === STATE.LOADING && <Fade
						in={true}
						style={{
						}}
						timeout={1000}
						unmountOnExit
					>
						<CircularProgress />
					</Fade>}
				</Box>}
				<Box style={{ visibility: state === STATE.APIKEYS ? 'visible' : 'hidden' }}>
					<Box position={'relative'}>
						<Badge badgeContent={'POS'} color="secondary" classes={{ badge: classes.badge }}>
							<Image src={'/assets/qerko-logo.svg'} width={300} height={150} alt={'Qerko Logo'} />
						</Badge>
					</Box>
					<List style={{ width: '100%', maxHeight: '200px', overflow: 'auto' }} dense={false}>
						{apiKeys.map((apiKey) => <ListItem key={apiKey.apiKey} disablePadding>
							<ListItemButton onClick={() => applyApiKey(apiKey.apiKey)}>
								<ListItemIcon>
									<VpnKey />
								</ListItemIcon>
								<ListItemText
									primary={apiKey.restaurant}
									secondary={apiKey.apiKey}
								/>
							</ListItemButton>
						</ListItem>,
						)}
					</List>
					<ApiKeyForm
						callback={applyApiKey}
					/>
				</Box>
			</Paper>
		</Fade>
	);
};

const ApiKeyForm = ({ callback }: { callback: (apiKey: string, isNew: boolean) => void }) => {
	const [ customApiKey, setCustomApiKey ] = useState('');
	return (
		<>
			<TextField
				label={'Api key'}
				fullWidth
				autoComplete="apiKey"
				margin="normal"
				variant={'standard'}
				value={customApiKey}
				onChange={(e) => setCustomApiKey(e.target.value)}
			/>
			<Box mt={2} display={'flex'} justifyContent={'center'}>
				<Button variant={'contained'} onClick={() => callback(customApiKey, true)}>
					Použít
				</Button>
			</Box>
		</>
	);
};

export default IndexPage;
