import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { z } from 'zod';

import { useQerkoQuery } from '../../src/apiClient';

import type { Table } from '../../src/@types/pos';

export const TableCard = ({ table, showDetail }: { table: Table; showDetail: (props: { tableId: string; qrCode: string | null }) => void }) => {

	const { data: tableCode } = useQerkoQuery(
		`table-${table.id}`,
		'GET',
		() => `/api/v2/pos/qr/${table.id}`,
		z.object({ statusCode: z.literal(200), body: z.array(z.object({ code: z.string() })) }),
		{},
	);
	return (
		<CardActionArea onClick={() => showDetail({ tableId: table.id, qrCode: tableCode !== undefined && tableCode?.body.length > 0 ? tableCode.body[0].code : null })}>
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
					<Typography variant={'h6'}>{table.name}</Typography>
					<Typography variant={'caption'}>({table.id})</Typography>
				</Box>
			</Card>
		</CardActionArea>
	);
};
