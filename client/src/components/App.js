import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import HomePage from './HomePage';
import HomeProductsPage from './HomeProductsPage';
import ShowProductPage from './ShowProductPage';
import NewProductPage from './NewProductPage';
import EditProductPage from './EditProductPage';
import HomeFarmsPage from './HomeFarmsPage';
import ShowFarmPage from './ShowFarmPage';
import NewFarmPage from './NewFarmPage';

//MAKE SURE YOUR LOCALHOST MONGODB SERVER IS RUNNING!!!
const App = () => {
	return (
		<div>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/products" component={HomeProductsPage} />
					<Route exact path="/products/:id/edit" component={EditProductPage} />
					<Route exact path="/products/:id" component={ShowProductPage} />

					<Route exact path="/farms" component={HomeFarmsPage} />
					<Route exact path="/farms/new" component={NewFarmPage} />
					<Route exact path="/farms/:id/products/new" component={NewProductPage} />
					<Route exact path="/farms/:id" component={ShowFarmPage} />

					<Route exact path="*" component={() => 'Page Does Not Exist'} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
