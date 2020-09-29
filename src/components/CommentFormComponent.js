import React from 'react';
import { Control, Errors, Form } from "react-redux-form";
const { Component } = require("react");
const { Button, Label, Modal, ModalHeader, ModalBody, Row } = require("reactstrap");


const required = val => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);

		
		this.state = {
			isCommentModal: false
		};

		this.toggleCommentModal = this.toggleCommentModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(values) {
		console.log('Current State is: ' + JSON.stringify(values));
		alert('Current State is: ' + JSON.stringify(values));
		this.props.resetFeedbackForm();
	}

	toggleCommentModal() {
		this.setState({ isCommentModal: !this.state.isCommentModal });
	}

	render() {
		return (
			<div className="container">
				<div className="row">
				<Modal isOpen={this.state.isCommentModal} toggle={this.toggleCommentModal}>
						<ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
						<ModalBody>
							<div className="col-12 col-md-9">
								<Form model='feedback' onSubmit={(values) => this.handleSubmit(values)}>
									<Row className="form-group">
										<Label htmlFor="rating" md={12}>Rating</Label>
											<Control.select model=".rating" name="rating"
												className="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</Control.select>
									</Row>
									<Row className="form-group">
										<Label htmlFor="name" md={12}>Your Name</Label>
											<Control.text model=".name" id="name" name="name"
												placeholder="Your Name"
												className="form-control"
												validators={{
													required, minLength: minLength(3), maxLength: maxLength(15)
												}}
											/>
											<Errors
												className="text-danger"
												model=".name"
												show="touched"
												messages={{
													required: 'Required. ',
													minLength: 'Must be greater than 2 characters',
													maxLength: 'Must be 15 characters or less'
												}}
											/>
									</Row>
									<Row className="form-group">
										<Label htmlFor="comments" md={12}>Comment</Label>
											<Control.textarea model=".comments" id="comments" name="comments"
												placeholder="Enter Text"
												rows={6}
												className="form-control"
												// validators={{
												// 	required, minLength: minLength(3), maxLength: maxLength(15)
												// }}
											/>
											{/* <Errors
												className="text-danger"
												model=".comments"
												show="touched"
												messages={{
													required: 'Required. ',
													minLength: 'Must be greater than 2 numbers',
													maxLength: 'Must be 15 numbers or less'
												}}
											/> */}
									</Row>
									<Row>
										<Button type="submit" color="primary" >Submit</Button>
									</Row>
								</Form>
							</div>
						</ModalBody>
					</Modal>
				</div>
				<Button outline onClick={() => this.toggleCommentModal()}><span className="fa fa-pen fa-lg"></span> Submit Comment</Button>
			</div>
		);
	}
}

export default CommentForm;