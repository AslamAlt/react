import React, {Component} from 'react';
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent'
import Footer from './FooterComponent'

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
		const HomePage = () => {
			return(
				<Home />
			);
		}

		return (
			<div className="container">

				<Header />

				<Switch>
					<Route path='/home' component={HomePage}></Route>
					<Route path='/menu' component={ () => <Menu dishes={this.state.dishes} /> } ></Route>
					<Redirect to='/home'></Redirect>
				</Switch>

				<DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

				<Footer />

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