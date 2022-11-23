import axios, { AxiosInstance } from 'axios';

const axiosCreateInstance = async () => {
	const accessToken = localStorage.getItem('token');
	return axios.create({
		baseURL: process.env.REACT_APP_PMS_WEB_API,
		timeout: 5000,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	});
};

export const apiInstance = async (): Promise<AxiosInstance> =>
	axiosCreateInstance();

export const postAuthApiInstance = async (url: string, data: object) => {
	const API_URL = `${process.env.REACT_APP_PMS_WEB_API + url}`;

	const response = await axios.post(API_URL, data);
	return response;
};

export const getApiInstance = async (url: string) => {
	const api = await apiInstance();
	return api.get(url);
};

export const postApiInstance = async (url: string, data: object) => {
	const api = await apiInstance();
	return api.post(url, data);
};

export const putApiInstance = async (url: string, data: object) => {
	const api = await apiInstance();
	return api.patch(url, data);
};

export const deleteApiInstance = async (url: string) => {
	const api = await apiInstance();
	return api.delete(url);
};
