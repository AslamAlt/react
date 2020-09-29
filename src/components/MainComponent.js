import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import Footer from './FooterComponent'
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import {Dishes} from '../redux/dishes';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}
}

const mapDispatchToProps = dispatch => ({
	addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
	fetchDishes: () => { dispatch(fetchDishes()) }
});

class Main extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchDishes();
	}

	onDishSelect(dishId) {
		this.setState({ selectedDish: dishId });
	}

	render() {
		const HomePage = () => {
			return (
				<Home
					dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
					dishesErrMess={this.props.dishes.errMess}
					dishesIsLoading={this.props.dishes.isLoading}
					promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
					leader={this.props.leaders.filter((leader) => leader.featured)[0]}
				/>
			);
		}

		const DishWithId = ({ match }) => {
			return (
				<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
					addComment={this.props.addComment} />
			);
		};

		return (
			<div className="container">

				<Header />

				<Switch>
					<Route path='/home' component={HomePage}></Route>
					<Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} ></Route>
					<Route path='/menu/:dishId' component={DishWithId} />
					<Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
					<Route path='/contactus' component={Contact} />
					<Redirect to='/home'></Redirect>
				</Switch>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));