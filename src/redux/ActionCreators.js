import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishes: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

});

export const addFeedback = (name, lname, tel, email, agree, message) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: {
      name: name,
      lname: lname,
      tel: tel,
      email: email,
      agree: agree,
      message: message
  }

});

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    const dishes = DISHES;
    console.log("dishes",dishes)
    // return fetch(baseUrl + 'dishes')
    // .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //   error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //   })
    // .then(response => response.json())
    dispatch(addDishes(dishes))
    // .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const addDishes  = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const fetchComments = () => (dispatch) => {    
    // return fetch(baseUrl + 'comments')
    // .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //   error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //   })
    // .then(response => response.json())
    // .then(comments => dispatch(addComment(comments)))
    // .catch(error => dispatch(commentsFailed(error.message)));
    const comments = COMMENTS;
    dispatch(addComment(comments))
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

// export const addComment = (comment) => ({
//     type: ActionTypes.ADD_COMMENT,
//     payload: comment
// });

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    // return fetch(baseUrl + 'promotions')
    // .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //   error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //   })
    // .then(response => response.json())
    // .then(promos => dispatch(addPromos(promos)))
    // .catch(error => dispatch(promosFailed(error.message)));
    const promos = PROMOTIONS
    dispatch(addPromos(promos))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    
  dispatch(leadersLoading());

  // return fetch(baseUrl + 'leaders')
  // .then(response => {
  //     if (response.ok) {
  //       return response;
  //     } else {
  //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
  //       error.response = response;
  //       throw error;
  //     }
  //   },
  //   error => {
  //         var errmess = new Error(error.message);
  //         throw errmess;
  //   })
  // .then(response => response.json())
  // .then(promos => dispatch(addLeaders(promos)))
  // .catch(error => dispatch(leadersFailed(error.message)));
  const leaders = LEADERS;
  dispatch(addLeaders(leaders))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFeedback = (name, lname, tel, email, agree, message) => (dispatch) => {
  const newFeedback = {
    name: name,
      lname: lname,
      tel: tel,
      email: email,
      agree: agree,
      message: message
};
newFeedback.date = new Date().toISOString();

return fetch(baseUrl + 'feedback', {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        throw error;
  })
.then(response => response.json())
.then(response => dispatch(addFeedback(response)))
.catch(error =>  { console.log('post feedback', error.message); alert('Your Feedback could not be posted\nError: '+error.message); });
};