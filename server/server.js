const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product');
const Farm = require('./models/farm');

require('dotenv').config();

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// prettier-ignore

//Body-Parser Middleware (for parsing <form> data from a POST request.)
//(May not need it in React)
app.use(express.urlencoded({extended: true}));
//Body-Parser (for parsing JSON data from a POST request)
app.use(express.json());
//Middleware that allows access to XMLHttpRequests,
//that is otherwise blocked by CORS(Cross-Origin Resource Sharing) policy.
app.use(cors());

//==================================================================
//FARM ROUTES:
//==================================================================

//INDEX ROUTE
app.get('/farms', async (req, res) => {
	const farms = await Farm.find({});
	res.send(farms);
});

//CREATE ROUTE
app.post('/farms', async (req, res) => {
	//Created a new farm
	const { name, city, email } = req.body;

	const newFarm = new Farm({
		name,
		city,
		email,
	});

	await newFarm.save();
	res.send(newFarm);
});

//SHOW ROUTE
app.get('/farms/:id', async (req, res) => {
	const { id } = req.params;
	const foundFarm = await Farm.findById(id).populate('products');
	res.send(foundFarm);
});

//CREATE ROUTE FOR ASSOCIATED PRODUCT
app.post('/farms/:id/products/', async (req, res) => {
	//Find specific farm
	const { id } = req.params;
	const foundFarm = await Farm.findById(id);
	//Created a new product for a specific farm
	const { productName, price, category } = req.body;

	const newProduct = new Product({
		name: productName,
		price,
		category,
	});

	//Push that new product into that specific Farm model's "products" array (models/farm.js)
	foundFarm.products.push(newProduct);
	//Associate that specific Farm to that new Product model's "farm" field (models/product.js)
	newProduct.farm = foundFarm;
	//save the updated information.
	await foundFarm.save();
	await newProduct.save();
	res.send(foundFarm);
});

//DELETE ROUTE
app.delete('/farms/:id', async (req, res) => {
	const deletedFarm = await Farm.findByIdAndDelete(req.params.id);
	res.send(deletedFarm);
});

//==================================================================
//PRODUCT ROUTES:
//==================================================================

//INDEX ROUTE
app.get('/products', async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

//SHOW ROUTE
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const foundProduct = await Product.findById(id).populate('farm', 'name');
	res.send(foundProduct);
});

//CREATE ROUTE
app.post('/products', async (req, res) => {
	//Created a new product
	const { productName, price, category } = req.body;

	const newProduct = new Product({
		name: productName,
		price,
		category,
	});
	await newProduct.save();
	res.send(newProduct);
});

//UPDATE ROUTE
app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const { productName, price, category } = req.body;

	const body = {
		name: productName,
		price,
		category,
	};

	const updatedProduct = await Product.findByIdAndUpdate(id, body, {
		new: true,
		runValidators: true,
	});

	res.send(updatedProduct);
});

//DELETE ROUTE
app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.send(deletedProduct);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}!`);
});
