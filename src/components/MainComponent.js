import React, { Component } from "react";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Footer from "./FooterComponent";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    dishes: state?.dishes,
    comments: state?.comments,
    promotions: state?.promotions,
    leaders: state?.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset("feedback")),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: () => dispatch(postFeedback()),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props?.dishes?.dishes.filter((dish) => dish.featured)[0]}
          dishesErrMess={this.props?.dishes?.errMess}
          dishesIsLoading={this.props?.dishes?.isLoading}
          promotion={
            this.props?.promotions?.promotions?.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props?.promotions?.isLoading}
          promoErrMess={this.props?.promotions?.errMess}
          leader={
            this.props?.leaders?.leaders?.filter((leader) => leader.featured)[0]
          }
          leaderLoading={this.props?.leaders?.isLoading}
          leaderErrMess={this.props?.leaders?.errMess}
        />
      );
    };

    const DishWithId = () => {
      const params = useParams();
      return (
        <DishDetail
          dish={
            this.props.dishes?.dishes.filter(
              (dish) => dish.id === parseInt(params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes?.isLoading}
          errMess={this.props.dishes?.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div className="container">
        <Header />

        <TransitionGroup>
          <CSSTransition
            key={this?.props?.location?.key}
            classNames="page"
            timeout={300}
          >
            <Routes location={this.props.location}>
              <Route path="/" element={<HomePage />} />
              <Route
                exact
                path="menu"
                element={
                  <Menu
                    dishes={this.props.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                  />
                }
              ></Route>
              <Route path="menu/:dishId" element={<DishWithId />} />
              <Route
                path="aboutus"
                element={<About leaders={this.props.leaders} />}
              />
              <Route
                path="contactus"
                element={
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                }
              />
              {/* <Navigate to="/" replace /> */}
            </Routes>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
