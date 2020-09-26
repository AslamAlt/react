import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function renderDish(dish) {
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

function renderComments(comments) {
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

const DishDetail = (props) => {
	if (props.selectedDish != null) {

		// const dishDetail = this.props.selectedDish.map((dish) => { -->MAP ONLY WORKS FOR ARRAYS

		var dish = props.selectedDish;
		return (
			<div className="container">
				<div className="row">

					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>

					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
					
				</div>
				<div className="row">

					{renderDish(dish)}
					{renderComments(dish.comments)}

				</div>

			</div>
		);
	}
	else return (
		<div />
	);
}

export default DishDetail;