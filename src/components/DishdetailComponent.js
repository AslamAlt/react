import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

class DishDetail extends Component {

	// componentDidMount() {
	// 	this.setState({ selDish: this.props.selectedDish });
	// }

	renderDish(dish) {
		if (dish != null)
			return (
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card>
						<CardImg top width="100%" src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		else return (<div />);
	}

	renderComments(comments) {
		if (comments != null) {
			let options = { year: "numeric", month: "short", day: "numeric" };
			const comment = comments.map((comm) => {
				return (
					<div>
						<ul className="list-unstyled">
							<li className="list-item">
								<p>{comm.comment} </p>
								<p>-- {comm.author}, {new Date(comm.date).toLocaleDateString("en-US", options)} </p>
							</li>
						</ul>
					</div>
				);
			});

			return (
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					{comment}
				</div>
			);
		}
		else return (<div />);
	}

	render() {
		if (this.props.selectedDish != null) {

			// const dishDetail = this.props.selectedDish.map((dish) => { -->MAP ONLY WORKS FOR ARRAYS

			var dish = this.props.selectedDish;
			return (
				<div className="row">

					{this.renderDish(dish)}

					{this.renderComments(dish.comments)}

				</div>
			);
		}
		else return (
			<div />
		);
	}

}

export default DishDetail;