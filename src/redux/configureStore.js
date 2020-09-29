import { combineReducers, createStore } from "redux"
import { COMMENTS } from "../shared/comments";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { initialState, Reducer } from "./reducer"

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        })
    );

    return store;
}