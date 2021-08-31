//ACTIONS

import { FETCH_PRODUCTS, FETCH_PRODUCT, FETCH_FARM, FETCH_FARMS } from './types';
import axios from 'axios';
import history from '../history';

//PRODUCTS ACTIONS
export const fetchProducts = () => async dispatch => {
	const response = await axios.get('http://localhost:3001/products');

	dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
	const response = await axios.get(`http://localhost:3001/products/${id}`);

	dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const updateProduct = (formValues, id) => async dispatch => {
	await axios.put(`http://localhost:3001/products/${id}`, formValues);

	history.push('/products');
};

export const deleteProduct = id => async dispatch => {
	await axios.delete(`http://localhost:3001/products/${id}`);

	history.push('/products');
};

//FARM ACTIONS
export const fetchFarms = () => async dispatch => {
	const response = await axios.get('http://localhost:3001/farms');

	dispatch({ type: FETCH_FARMS, payload: response.data });
};

export const fetchFarm = id => async dispatch => {
	const response = await axios.get(`http://localhost:3001/farms/${id}`);

	dispatch({ type: FETCH_FARM, payload: response.data });
};

export const createFarm = formValues => async dispatch => {
	await axios.post('http://localhost:3001/farms', formValues);

	history.push('/farms');
};

export const createFarmProduct = (id, formValues) => async dispatch => {
	await axios.post(`http://localhost:3001/farms/${id}/products/`, formValues);

	history.push('/farms');
};

export const deleteFarm = id => async dispatch => {
	await axios.delete(`http://localhost:3001/farms/${id}`);

	history.push('/farms');
};
