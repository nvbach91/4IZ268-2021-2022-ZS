import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { assertNotUndefined } from '../utils/assert';
import { initialPosItems } from '../@types/pos';

import { initialTables } from './initialValues/tables';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Pos, Table, Bill, PosItem } from '../@types/pos';

const posAdapter = createEntityAdapter<Pos>({
	selectId: (pos) => pos.restaurantId,
});

const tableAdapter = createEntityAdapter<Table>({
	selectId: (table) => table.id,
});

const billAdapter = createEntityAdapter<Bill>({
	selectId: (bill) => bill.id,
});

const posItemAdapter = createEntityAdapter<PosItem>({
	selectId: (posItem) => posItem.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const posSelector = posAdapter.getSelectors<RootState>((store) => store.pos);

export const tableSelector = (restaurantId: string) => tableAdapter.getSelectors<RootState>((store) => {
	const pos = posSelector.selectById(store, restaurantId);
	assertNotUndefined(pos);
	return pos.tables;
});

export const billSelector = (restaurantId: string) => billAdapter.getSelectors<RootState>((store) => {
	const pos = posSelector.selectById(store, restaurantId);
	assertNotUndefined(pos);
	return pos.bills;
});

export const posItemSelector = (restaurantId: string) => posItemAdapter.getSelectors<RootState>((store) => {
	const pos = posSelector.selectById(store, restaurantId);
	assertNotUndefined(pos);
	return pos.posItems;
});

export const posSlice = createSlice({
	name: 'pos',
	initialState: posAdapter.getInitialState(),
	reducers: {
		addNewPos(state, action: PayloadAction<string>) {
			return posAdapter.addOne(state, {
				restaurantId: action.payload,
				tables: tableAdapter.addMany(tableAdapter.getInitialState(), initialTables),
				bills: billAdapter.getInitialState([]),
				posItems: posItemAdapter.addMany(posItemAdapter.getInitialState(), initialPosItems),
			});
		},
		addBill(state, action: PayloadAction<{ bill: Bill; restaurantId: string }>) {
			const pos: Pos | undefined = posAdapter.getSelectors().selectById({ ...state }, action.payload.restaurantId);
			assertNotUndefined(pos);

			billAdapter.addOne(pos.bills, action.payload.bill);

		},
		changeBill(state, action: PayloadAction<{ bill: Bill; restaurantId: string }>) {
			const pos: Pos | undefined = posAdapter.getSelectors().selectById({ ...state }, action.payload.restaurantId);
			assertNotUndefined(pos);

			billAdapter.setOne(pos.bills, action.payload.bill);
		},
		removeBill(state, action: PayloadAction<{ bill: Bill; restaurantId: string }>) {
			const pos: Pos | undefined = posAdapter.getSelectors().selectById({ ...state }, action.payload.restaurantId);
			assertNotUndefined(pos);

			billAdapter.removeOne(pos.bills, action.payload.bill.id);
		},
	},
});

export const posActions = posSlice.actions;
