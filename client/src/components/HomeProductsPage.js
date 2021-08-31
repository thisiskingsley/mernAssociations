import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../actions/index';

class HomeProductsPage extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
	}

	renderList() {
		if (this.props.products.length === 0) {
			return <div>Waiting...</div>;
		} else {
			return this.props.products.map(product => {
				return (
					<div className="item" key={product._id}>
						<div className="content">
							<Link to={`/products/${product._id}`} className="header">
								{product.name}
							</Link>
						</div>
					</div>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<h1>All Products</h1>
				<div className="ui celled list">{this.renderList()}</div>
				<button style={{ background: 'lightblue', marginTop: '20px' }}>
					<Link to="/">Home</Link>
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { products: state.products };
};

export default connect(mapStateToProps, { fetchProducts })(HomeProductsPage);
