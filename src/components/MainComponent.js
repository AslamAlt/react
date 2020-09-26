import React, {Component} from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import Footer from './FooterComponent'

class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dishes: DISHES,
			comments: COMMENTS,
			promotions: PROMOTIONS,
      leaders: LEADERS
		};
	}

	onDishSelect(dishId) {
		this.setState({selectedDish : dishId});
	}

	render() {
		const HomePage = () => {
			return(
				<Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
				promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
				leader={this.state.leaders.filter((leader) => leader.featured)[0]}
				/>
			);
		}

		const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

		return (
			<div className="container">

				<Header />

				<Switch>
					<Route path='/home' component={HomePage}></Route>
					<Route path='/menu' component={ () => <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/> } ></Route>
					<Route path='/aboutus' component={() => <About leaders={this.state.leaders}/>} />
					<Route path='/menu/:dishId' component={DishWithId} />
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

export default Main;