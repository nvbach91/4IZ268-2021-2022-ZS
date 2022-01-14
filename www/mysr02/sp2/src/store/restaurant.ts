import { createSlice } from '@reduxjs/toolkit';
import type { Restaurant } from '../@types/restaurant';

const initialState: Restaurant = {
	apiKey: null,
	name: null,
	id: null,
};

export const counterSlice = createSlice({
	name: 'restaurant',
	initialState,
	reducers: {
		increase: (state) => {
			state.value += 1;
		},
		decrease: (state) => {
			state.value -= 1;
		},
	},
});

// each case under reducers becomes an action
export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
