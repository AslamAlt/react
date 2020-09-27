import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Control, Errors, LocalForm } from "react-redux-form";

const required = val => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {

	constructor(props) {
		super(props);

		// this.state = {
		// 	isCommentModal: false
		// };

		// this.toggleCommentModal = this.toggleCommentModal.bind(this);
	}

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
				<CommentForm />
			</div>
		);
	}
	else return (<div />);
}

// toggleCommentModal() {
// 	this.setState({ isCommentModal: !this.state.isCommentModal });
// }

 render() {
	if (this.props.dish != null) {

		// const dishDetail = this.props.selectedDish.map((dish) => { -->MAP ONLY WORKS FOR ARRAYS
		return (
			<div className="container">
				<div className="row">

					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
					</Breadcrumb>

					

					<div className="col-12">
						<h3>{this.props.dish.name}</h3>
						<hr />
					</div>

				</div>
				<div className="row">

					{this.renderDish(this.props.dish)}
					{this.renderComments(this.props.comments)}

				</div>

			</div>
		);
	}
	else return (
		<div />
	);
}
}

export default DishDetail;