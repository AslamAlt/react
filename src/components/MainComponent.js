import React, {Component} from 'react';
import { DISHES } from '../shared/dishes';
import { Navbar, NavbarBrand } from 'reactstrap';
import DishDetail from './DishdetailComponent'
import Menu from './MenuComponent';

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			selectedDish: null
		};
	}

	onDishSelect(dishId) {
		this.setState({selectedDish : dishId});
	}

	render() {
		return (
			<div className="container">

				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">Restaurant Confusion</NavbarBrand>
					</div>
				</Navbar>

				<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>

				<DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

				<header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>

			</div>
		);
	}

}

export default Main;