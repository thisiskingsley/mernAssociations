import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFarms } from '../actions/index';

class HomeFarmsPage extends React.Component {
	componentDidMount() {
		this.props.fetchFarms();
	}
	renderList() {
		if (this.props.farms.length === 0) {
			return <div>Waiting...</div>;
		} else {
			return this.props.farms.map(farm => {
				return (
					<div className="item" key={farm._id}>
						<div className="content">
							<Link to={`/farms/${farm._id}`} className="header">
								{farm.name}
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
				<h1>All Farms</h1>
				<div className="ui celled list">{this.renderList()}</div>
				<div style={{ marginTop: '20px' }}>
					<button style={{ background: 'lightblue' }}>
						<Link to="/">Home</Link>
					</button>
					<button style={{ background: 'lightgreen', marginLeft: '20px' }}>
						<Link to="/farms/new">Create Farm</Link>
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { farms: state.farms };
};

export default connect(mapStateToProps, { fetchFarms })(HomeFarmsPage);
