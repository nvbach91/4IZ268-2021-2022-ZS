import { useQuery } from 'react-query';
import axios from 'axios';

import { apiUrl, posId, useAppContext } from './connectionManager';

import type { z } from 'zod';
import type { QueryKey, UseQueryOptions, UseQueryResult } from 'react-query';
import type { RestaurantApikey } from './store/apiKeysSlice';

interface Response<TData> {
	statusCode: number;
	body: TData;
}

interface RequestOptions<TValidator, TBody extends Record<string, unknown> | undefined | BodyInit = undefined> {
	validator?: TValidator;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: TBody;
	headers?: Record<string, string>;
	lang?: string;
}

export const useQerkoQuery = <
	TValidator extends z.ZodType<any, any>,
	TResult extends z.infer<TValidator>,
>(
	key: QueryKey,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: () => string | null,
	validator: TValidator,
	config: UseQueryOptions<TResult>,
): UseQueryResult<TResult> => {
	const { restaurant } = useAppContext();

	return useQuery<TResult, unknown, TResult>(
		key,
		//@ts-expect-error
		async () => {
			const result = await doQerkoRequest<TValidator>(restaurant, apiUrl, path, {
				method,
				validator,
			});

			return result;
		},
		config,
	);
};

export const doQerkoRequest = async <TValidator extends z.ZodTypeAny = z.ZodUndefined, TBody extends Record<string, unknown> | undefined | BodyInit = undefined>(
	restaurant: RestaurantApikey | null,
	apiUrl: string,
	path: (context: {
		body: TBody;
	}) => string | null,
	{
		method = 'GET',
		validator,
		body,
		headers = {},
	}: RequestOptions<TValidator, TBody>): Promise<Response<z.infer<TValidator>>> => {
	headers['pos-Id'] = posId;

	if (restaurant !== null) {
		headers.Authorization = `Bearer ${restaurant.apiKey}`;
	}

	const url = path({
		body: body as TBody,
	});
	if (url !== null) {
		return doRequest(apiUrl, url, {
			method,
			headers,
			validator,
			body,
		});
	}

	throw new Error('Unauthorized request');
};

export const doRequest = async <
	TValidator extends z.ZodTypeAny = z.ZodUndefined,
	TBody extends Record<string, unknown> | undefined | BodyInit = undefined,
>(
	apiUrl: string,
	path: string,
	{
		method = 'GET',
		validator,
		body,
		headers = {},
	}: RequestOptions<TValidator, TBody> = { method: 'GET', headers: {} }
): Promise<Response<z.infer<TValidator>>> => {
	const response = await axios.request({
		validateStatus: () => true,
		url: `${apiUrl}${path}`,
		method,
		data: body,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	});

	const result = {
		statusCode: response.status,
		body: response.data,
	};

	return validator !== undefined ? validator.parseAsync(result) : result;
};

export const useDownloadImage = (url: string) => {
	const { restaurant } = useAppContext();
	return useQuery(
		url,
		async () => {
			const headers: Record<string, string> = { };
			headers['pos-Id'] = posId;

			if (restaurant !== null) {
				headers.Authorization = `Bearer ${restaurant.apiKey}`;
			}
			const response = await axios.get(`${apiUrl}${url}`, {
				responseType: 'blob',
				headers: headers,
			});
			if (response.status === 200) {
				return URL.createObjectURL(response.data);
			}
		});
};
