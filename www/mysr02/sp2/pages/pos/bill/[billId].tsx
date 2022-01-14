import {
	Card,
	CardActionArea,
	CardContent,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCallback } from 'react';

import { useAppContext } from '../../../src/connectionManager';
import { assertNotNull, assertNotUndefined } from '../../../src/utils/assert';
import { useAppDispatch, useAppSelector } from '../../../src/store/store';
import { billSelector, posActions, posItemSelector } from '../../../src/store/posSlice';

import type { BillItem, PosItem } from '../../../src/@types/pos';

export const IndexPage = () => {
	const router = useRouter();
	const { restaurant } = useAppContext();
	assertNotNull(restaurant);
	const { billId } = router.query;
	const appDispatch = useAppDispatch();
	const bill = useAppSelector((state) => billSelector(restaurant.id).selectById(state, `${billId}`));
	const posItems = useAppSelector((state) => posItemSelector(restaurant.id).selectAll(state));
	assertNotUndefined(bill);
	const changeItem = useCallback((item: BillItem, add: boolean) => {
		const index = bill.items.findIndex((billItem) => item.id === billItem.id);
		const quantity = add ? parseFloat(item.quantity) + parseFloat(item.minQuantity) : parseFloat(item.quantity) - parseFloat(item.minQuantity);
		const items = quantity > 0 ? [
			...bill.items.slice(0, index),
			{
				...item,
				quantity: quantity.toString(),
			},
			...bill.items.slice(index + 1),
		] : bill.items.filter((billItem) => item.id !== billItem.id);
		appDispatch(posActions.changeBill({
			restaurantId: restaurant.id,
			bill: {
				...bill,
				items,
			},
		}));
	}, [ appDispatch, bill, restaurant.id ]);
	const addItem = useCallback((posItem: PosItem) => {
		const index = bill.items.findIndex((billItem) => posItem.id === billItem.id);
		const quantity = parseFloat(index !== -1 ? bill.items[index].quantity : '0') + parseFloat(posItem.minQuantity);
		const items = index !== -1 ? [
			...bill.items.slice(0, index),
			{
				...posItem,
				quantity: quantity.toString(),
			},
			...bill.items.slice(index + 1),
		] : [ ...bill.items, { ...posItem, quantity: quantity.toString() } ];
		appDispatch(posActions.changeBill({
			restaurantId: restaurant.id,
			bill: {
				...bill,
				items,
			},
		}));
	}, [ appDispatch, bill, restaurant.id ]);
	assertNotUndefined(bill);
	return (
		<Grid container spacing={4}>
			<Grid item sm={12} md={6} container spacing={4} alignItems={'center'}>
				{posItems.map((posItem) => <Grid xs={6} md={6} lg={4} item key={posItem.id}>
					<Card>
						<CardActionArea onClick={() => addItem(posItem)}>
							<CardContent>
								<Typography variant={'h6'}>{posItem.name}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>)}
			</Grid>
			<Grid item sm={12} md={6} container direction={'column'} alignItems={'center'}>
				<Grid item>
					<Typography variant={'h6'}>{bill.name}</Typography>
				</Grid>
				<Grid item>
					<List>
						{bill.items.map((item) => <ListItem
							key={item.id}
						>
							<ListItemText
								primary={item.name}
								secondary={`${item.quantity}x`}
							/>
							<IconButton edge="end" aria-label="delete" onClick={() => changeItem(item, false)}>
								<RemoveIcon />
							</IconButton>
							<IconButton edge="end" aria-label="add" onClick={() => changeItem(item, true)}>
								<AddIcon />
							</IconButton>
						</ListItem>)}
					</List>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default IndexPage;
