import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { apikeysSlice } from './apiKeysSlice';
import { posSlice } from './posSlice';

import type { TypedUseSelectorHook } from 'react-redux';

const initialLocalStorage = { apikeys: { 0: { apiKey: 'eeeu-g786-zp54-3v1c-db02-e4e1', name: 'Qerko Restaurace', id: '3504f728-b45b-11e7-835b-00270e03e2ad' }, ids: [ '3504f728-b45b-11e7-835b-00270e03e2ad' ], entities: { '3504f728-b45b-11e7-835b-00270e03e2ad': { id: '3504f728-b45b-11e7-835b-00270e03e2ad', name: 'Qerko Restaurace', apiKey: 'eeeu-g786-zp54-3v1c-db02-e4e1' } } }, pos: { ids: [ '3504f728-b45b-11e7-835b-00270e03e2ad' ], entities: { '3504f728-b45b-11e7-835b-00270e03e2ad': { restaurantId: '3504f728-b45b-11e7-835b-00270e03e2ad', tables: { ids: [ '1', '2', '3', '4', '5' ], entities: { 1: { id: '1', name: 'T1' }, 2: { id: '2', name: 'T2' }, 3: { id: '3', name: 'T3', area: 'A1', store: 'S1' }, 4: { id: '4', name: 'T4', area: 'A1', store: 'S1' }, 5: { id: '5', name: 'T5', area: 'A2', store: 'S1' } } }, bills: { ids: [], entities: {} }, posItems: {
	ids: [
		'd8f80449-4c96-454c-8b00-9580a3827348',
		'30c0fdb8-825a-4dbe-ace3-94ebfc3c3da7',
		'badc4cd3-252b-4268-963e-72bdbb1649a5',
		'e70094e9-75a4-49a5-9801-ba8ea7f4f9be',
		'69408650-30c6-4746-a603-92d07ae0b91a',
		'0f81bc11-2658-4b4a-b8bf-d91d38df84e7',
		'd24d429b-d433-4553-bc6f-78fbc3850e7f',
		'43c3141c-63a1-464f-8ac2-e32fa8a7e4ed',
	],
	entities: {
		'30c0fdb8-825a-4dbe-ace3-94ebfc3c3da7': {
			id: '30c0fdb8-825a-4dbe-ace3-94ebfc3c3da7',
			name: 'Černý čaj',
			price: '25.00',
			minQuantity: '1',
			tags: [],
		},
		'69408650-30c6-4746-a603-92d07ae0b91a': {
			id: '69408650-30c6-4746-a603-92d07ae0b91a',
			name: 'Ovocný čaj',
			price: '25.00',
			minQuantity: '1',
			tags: [],
		},
		'43c3141c-63a1-464f-8ac2-e32fa8a7e4ed': {
			id: '43c3141c-63a1-464f-8ac2-e32fa8a7e4ed',
			name: 'Zelený čaj',
			price: '25.00',
			minQuantity: '1',
			tags: [],
		},
		'd8f80449-4c96-454c-8b00-9580a3827348': {
			id: 'd8f80449-4c96-454c-8b00-9580a3827348',
			name: 'Coca cola',
			price: '30.00',
			minQuantity: '1',
			tags: [],
		},
		'badc4cd3-252b-4268-963e-72bdbb1649a5': {
			id: 'badc4cd3-252b-4268-963e-72bdbb1649a5',
			name: 'Fanta',
			price: '30.00',
			minQuantity: '1',
			tags: [],
		},
		'd24d429b-d433-4553-bc6f-78fbc3850e7f': {
			id: 'd24d429b-d433-4553-bc6f-78fbc3850e7f',
			name: 'Sprite',
			price: '30.00',
			minQuantity: '1',
			tags: [],
		},
		'0f81bc11-2658-4b4a-b8bf-d91d38df84e7': {
			id: '0f81bc11-2658-4b4a-b8bf-d91d38df84e7',
			name: 'Pilsner urquell',
			price: '45.00',
			minQuantity: '0.5',
			tags: [],
		},
		'e70094e9-75a4-49a5-9801-ba8ea7f4f9be': {
			id: 'e70094e9-75a4-49a5-9801-ba8ea7f4f9be',
			name: 'Kozel °12',
			price: '30.00',
			minQuantity: '0.3',
			tags: [],
		},
	},
} } } } };

const reHydrateStore = () => {
	if (typeof localStorage === 'undefined') return;
	const applicationState = localStorage.getItem('applicationState');
	if (applicationState !== null) {
		return JSON.parse(applicationState);
	}
	return initialLocalStorage;

};

const store = configureStore({
	reducer: {
		apikeys: apikeysSlice.reducer,
		pos: posSlice.reducer,
	},
	preloadedState: reHydrateStore(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(({ getState }) => {
				return (next) => (action) => {
					const result = next(action);
					localStorage.setItem('applicationState', JSON.stringify(getState()));
					return result;
				};
			}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
