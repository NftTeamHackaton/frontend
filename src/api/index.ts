import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_SECOND_BASE_URL = process.env.REACT_APP_API_SECOND_BASE_URL;

const _axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
	},
})

const _axiosInstanceSecond = axios.create({
	baseURL: API_SECOND_BASE_URL,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
	},
})

const httpClient = _axiosInstance;
export const httpSecondClient = _axiosInstanceSecond;

export default httpClient;
