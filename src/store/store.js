import { legacy_createStore as createStore,combineReducers,applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import createPlans from "./reducers/createPlans.js";

const reducers=combineReducers({
    plans:createPlans,
})

const store=createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;