import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import type { Bill } from '../../src/@types/pos';

export const BillCard = ({ bill }: { bill: Bill }) => {
	const router = useRouter();

	return (
		<CardActionArea onClick={() => router.push(`/pos/bill/${bill.id}`)}>
			<Card
				sx={{
					':hover': {
						boxShadow: '0px 0px 5px',
						transform: 'scale(1.07)',
					},
					transition: '0.8s',
					cursor: 'pointer',
				}}
			>
				<Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} height={140} width={140}>
					<Typography variant={'h6'}>{bill.name}</Typography>
					<Typography variant={'caption'}>{bill.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}</Typography>
				</Box>
			</Card>
		</CardActionArea>
	);
};
