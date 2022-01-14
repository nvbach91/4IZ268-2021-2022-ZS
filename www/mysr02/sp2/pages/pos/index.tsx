import { Box, Grid } from '@mui/material';
import { useState } from 'react';

import { useAppSelector } from '../../src/store/store';
import { billSelector, tableSelector } from '../../src/store/posSlice';
import { useAppContext } from '../../src/connectionManager';
import { assertNotNull } from '../../src/utils/assert';
import { OrderDialog } from '../../components/pos/orderDialog';
import { TableCard } from '../../components/pos/table';

const IndexPage = () => {
	const { restaurant } = useAppContext();
	assertNotNull(restaurant);
	const tables = useAppSelector((state) => tableSelector(restaurant.id).selectAll(state));
	const bills = useAppSelector((state) => billSelector(restaurant.id).selectAll(state).filter((bill) => bill.tableId));
	const [ selectedTable, setSelectedTable ] = useState<null | { tableId: string; qrCode: string | null }>(null);
	return (
		<Box my={5}>
			{selectedTable !== null && <OrderDialog tableId={selectedTable.tableId} qrCode={selectedTable.qrCode} hide={() => setSelectedTable(null)} />}
			<Grid container spacing={5}>
				{tables.map((table) => (
					<Grid item key={table.id}>
						<TableCard table={table} showDetail={setSelectedTable} countBill={bills?.length ?? 0} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default IndexPage;
