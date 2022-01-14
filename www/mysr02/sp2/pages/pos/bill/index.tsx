import { Box, Grid } from '@mui/material';

import { useAppSelector } from '../../../src/store/store';
import { useAppContext } from '../../../src/connectionManager';
import { assertNotNull } from '../../../src/utils/assert';
import { billSelector } from '../../../src/store/posSlice';
import { BillCard } from '../../../components/pos/billCard';

const IndexPage = () => {
	const { restaurant } = useAppContext();
	assertNotNull(restaurant);
	const bills = useAppSelector((state) => billSelector(restaurant.id).selectAll(state));
	return (
		<Box my={5}>
			<Grid container spacing={5}>
				{bills.map((bill) => (
					<Grid item key={bill.id}>
						<BillCard bill={bill} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default IndexPage;
