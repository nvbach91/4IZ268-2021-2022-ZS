import { createAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';

export type RestaurantApikey = {
	id: string;
	name: string;
	apiKey: string;
};

const apikeyAdapter = createEntityAdapter<RestaurantApikey>({
	selectId: (restaurant) => restaurant.id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const addApikey = createAction<RestaurantApikey>('addApikey');

export const apikeysSlice = createSlice({
	name: 'apikeys',
	initialState: apikeyAdapter.getInitialState([ {
		apiKey: 'eeeu-g786-zp54-3v1c-db02-e4e1',
		name: 'Qerko Restaurace',
		id: '3504f728-b45b-11e7-835b-00270e03e2ad',
	} ]),
	reducers: {
		[addApikey.type]: apikeyAdapter.addOne,
	},
});

export const apiKeysSelector = apikeyAdapter.getSelectors<RootState>((store) => store.apikeys);

export const apikeysActions = apikeysSlice.actions;
