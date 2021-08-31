import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to Home Page</h1>
				<button style={{ background: 'pink', marginLeft: '20px' }}>
					<Link to="/farms">Go To Farms Page</Link>
				</button>
				<button style={{ background: 'lightgreen', marginLeft: '20px' }}>
					<Link to="/products">Go To Products Page</Link>
				</button>
			</div>
		);
	}
}

export default HomePage;
