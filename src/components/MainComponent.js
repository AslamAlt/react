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
import { Dishes } from '../redux/dishes';
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders
	}
}

const mapDispatchToProps = dispatch => ({
	// addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
	fetchDishes: () =>  dispatch(fetchDishes()) ,
	resetFeedbackForm: () => dispatch(actions.reset('feedback')),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

class Main extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
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
					promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
					promoLoading={this.props.promotions.isLoading}
					promoErrMess={this.props.promotions.errMess}
					leader={this.props.leaders.filter((leader) => leader.featured)[0]}
				/>
			);
		}

		const DishWithId = ({ match }) => {
			return (
				<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
					commentsErrMess={this.props.comments.errMess}
					postComment={this.props.postComment} />
			);
		};

		return (
			<div className="container">

				<Header />

				<TransitionGroup>
					<CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						<Switch location={this.props.location}>
							<Route path='/home' component={HomePage}></Route>
							<Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} ></Route>
							<Route path='/menu/:dishId' component={DishWithId} />
							<Route path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
							<Route path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
							<Redirect to='/home'></Redirect>
						</Switch>
					</CSSTransition>
				</TransitionGroup>

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