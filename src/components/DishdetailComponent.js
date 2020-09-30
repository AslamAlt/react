import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {

	constructor(props) {
		super(props);

	}

	renderDish(dish) {
		if (dish != null)
			return (
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<FadeTransform
						in
						transformProps={{
							exitTransform: 'scale(0.5) translateY(-50%)'
						}}>
						<Card>
							<CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
							<CardBody>
								<CardTitle>{dish.name}</CardTitle>
								<CardText>{dish.description}</CardText>
							</CardBody>
						</Card>
					</FadeTransform>
				</div>
			);
		else return (<div />);
	}

	renderComments({ comments, postComment, dishId }) {
		if (comments != null) {
			let options = { year: "numeric", month: "short", day: "numeric" };
			const comment = <Stagger in>
				{comments.map((comm) => {
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
				})}
			</Stagger>

			return (
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					{comment}
					<CommentForm dishId={dishId} postComment={postComment} />
				</div>
			);
		}
		else return (<div />);
	}

	render() {
		if (this.props.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		}
		else if (this.props.errMess) {
			return (
				<div className="container">
					<div className="row">
						<h4>{this.props.errMess}</h4>
					</div>
				</div>
			);
		}
		else if (this.props.dish != null) {

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
						{this.renderComments(this.props.comments, this.props.postComment, this.props.dish.id)}

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