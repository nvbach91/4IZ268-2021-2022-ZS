import {
	Box,
	Button,
	Dialog,
	DialogContent,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useDownloadImage } from '../../src/apiClient';
import { useAppDispatch, useAppSelector } from '../../src/store/store';
import { billSelector, posActions, tableSelector } from '../../src/store/posSlice';
import { useAppContext } from '../../src/connectionManager';
import { assertNotNull } from '../../src/utils/assert';
import { Currency, initialBill } from '../../src/@types/pos';

import type { Bill } from '../../src/@types/pos';
import type { Theme } from '@mui/material';

export const OrderDialog = ({ tableId, hide, qrCode }: { tableId: string; hide: () => void; qrCode: string | null }) => {
	const { restaurant } = useAppContext();
	assertNotNull(restaurant);
	const router = useRouter();
	const { data: imageSrc } = useDownloadImage(`/api/v2/pos/qr-image/${qrCode}?legacy=1`);
	const showQr = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const table = useAppSelector((state) => tableSelector(restaurant.id).selectById(state, tableId));
	const bills = useAppSelector((state) => billSelector(restaurant.id).selectAll(state).filter((bill) => bill.tableId));
	const appDispatch = useAppDispatch();
	const newBill = useCallback(() => {
		const bill: Bill = {
			...initialBill,
			id: uuidv4(),
			name: `${tableId}-${bills.length + 1}`,
			tableId: tableId,
			currency: Currency.CZK,
		};
		appDispatch(posActions.addBill({ bill, restaurantId: restaurant.id }));
		// router.push(`pos/bill/${bill.id}`);
	}, [ appDispatch, bills.length, restaurant.id, tableId ]);
	return (
		<>
			{table !== undefined && <Dialog open={true} onClose={hide}>
				<DialogContent>
					<Stack spacing={5} direction={'row'}>
						{showQr && imageSrc !== undefined && <Box><Box sx={{ boxShadow: '0 0 3px' }} p={1}><img width={208} alt="" src={imageSrc} /></Box></Box>}
						<Grid container direction={'column'} justifyContent={'space-between'} xs={12} md={imageSrc !== undefined ? 6 : 12}>
							<Grid item container justifyContent={'center'}>
								<Typography variant={'h3'}>{table.name}</Typography>
							</Grid>
							<Grid item container direction={'column'} sx={{ maxWidth: '100% !important' }}>
								{bills.length > 0 && <Grid item>
									<List>
										{bills.map((bill) => <ListItemButton key={bill.id} onClick={() => router.push(`/pos/bill/${bill.id}`)}>
											<ListItemText
												primary={bill.name}
												secondary={<Typography textOverflow={'ellipsis'} noWrap>{bill.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</Typography>}
											/>
										</ListItemButton>)}
									</List>
								</Grid>}
								{bills.length === 0 && <Grid item m={2}>
									<Typography variant={'overline'} fontSize={'1rem'}>
										Empty bill list
									</Typography>
								</Grid>}
							</Grid>
							<Grid item display={'flex'} justifyContent={'center'} mt={3}>
								<Button variant={'text'} onClick={newBill}>
									New bill
								</Button>
							</Grid>
						</Grid>
					</Stack>
				</DialogContent>
			</Dialog>}
		</>
	);
};
