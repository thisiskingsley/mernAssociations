import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFarm, deleteFarm } from '../actions/index';

class ShowFarmPage extends React.Component {
	componentDidMount() {
		const { match } = this.props;
		this.props.fetchFarm(match.params.id);
	}

	renderList() {
		if (!this.props.farm.products) {
			return <div>Waiting...</div>;
		} else {
			return this.props.farm.products.map(product => {
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
		const { farm } = this.props;
		return (
			<div>
				<h1>{farm.name}</h1>
				<ul>
					<li>City: {farm.city}</li>
					<li>Contact: {farm.email}</li>
				</ul>
				<h2>Products</h2>
				<div className="ui celled list">{this.renderList()}</div>

				<div style={{ marginTop: '100px' }}>
					<button style={{ background: 'lightblue' }}>
						<Link to="/farms">All Farms</Link>
					</button>
					<button style={{ background: 'lightgreen', marginLeft: '20px' }}>
						<Link to={`/farms/${farm._id}/products/new`}>Create A Product</Link>
					</button>
					<button
						onClick={() => {
							this.props.deleteFarm(farm._id);
						}}
						style={{ background: 'red', marginLeft: '20px' }}
					>
						DELETE
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { farm: state.farm, match: ownProps.match };
};

export default connect(mapStateToProps, { fetchFarm, deleteFarm })(ShowFarmPage);
