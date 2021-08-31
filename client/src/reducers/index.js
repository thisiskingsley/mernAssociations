//REDUCERS
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { productsReducer } from './productsReducer';
import { productReducer } from './productReducer';
import { farmReducer } from './farmReducer';
import { farmsReducer } from './farmsReducer';

export default combineReducers({
	farms: farmsReducer,
	farm: farmReducer,
	products: productsReducer,
	product: productReducer,
	form: formReducer,
});
