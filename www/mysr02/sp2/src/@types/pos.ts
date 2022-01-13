import type { EntityState } from '@reduxjs/toolkit';

export type Table = {
	id: string;
	name: string;
	area?: string;
	store?: string;
};

export type Pos = {
	restaurantId: string;
	tables: EntityState<Table>;
	bills: EntityState<Bill>;
	posItems: EntityState<PosItem>;
	// orders: Order[];
};

export type PosItem = {
	id: string;
	minQuantity: string;
	name: string;
	price: string;
	tags: string[];
};

export type Bill = {
	additionalData?: {
	} | null;
	currency: Currency;
	denyDiscounts: boolean;
	discountOffer: BillDiscountOffer | null;
	id: string;
	items: BillItem[];
	name: string | null;
	allowTip: boolean;
	allowPartialPayment: boolean;
	denyMenus: boolean;
	tableId: string;
	paymentId: string | null;
};

export enum Currency {
	CZK = 'CZK',
	USD = 'USD',
	EUR = 'EUR',
}

export type BillItem = {
	additionalData?: null | Record<string, unknown>;
	id: string;
	minQuantity: string;
	name: string;
	price: string;
	quantity: string;
	tags: string[];
};

export type BillDiscountOffer = {
	additionalData: unknown | null;
	name: string;
	percent: string;
};

export const initialBill: Bill = {
	id: '',
	name: '',
	tableId: '',
	additionalData: null,
	currency: Currency.CZK,
	denyDiscounts: false,
	discountOffer: null,
	items: [],
	allowTip: true,
	allowPartialPayment: false,
	denyMenus: false,
	paymentId: null,
};

export const initialPosItems: PosItem[] = [
	{ id: '30c0fdb8-825a-4dbe-ace3-94ebfc3c3da7', name: 'Černý čaj', price: '25.00', minQuantity: '1', tags: [] },
	{ id: '69408650-30c6-4746-a603-92d07ae0b91a', name: 'Ovocný čaj', price: '25.00', minQuantity: '1', tags: [] },
	{ id: '43c3141c-63a1-464f-8ac2-e32fa8a7e4ed', name: 'Zelený čaj', price: '25.00', minQuantity: '1', tags: [] },
	{ id: 'd8f80449-4c96-454c-8b00-9580a3827348', name: 'Coca cola', price: '30.00', minQuantity: '1', tags: [] },
	{ id: 'badc4cd3-252b-4268-963e-72bdbb1649a5', name: 'Fanta', price: '30.00', minQuantity: '1', tags: [] },
	{ id: 'd24d429b-d433-4553-bc6f-78fbc3850e7f', name: 'Sprite', price: '30.00', minQuantity: '1', tags: [] },
	{ id: '0f81bc11-2658-4b4a-b8bf-d91d38df84e7', name: 'Pilsner urquell', price: '45.00', minQuantity: '0.5', tags: [] },
	{ id: 'e70094e9-75a4-49a5-9801-ba8ea7f4f9be', name: 'Kozel °12', price: '30.00', minQuantity: '0.3', tags: [] },
];
