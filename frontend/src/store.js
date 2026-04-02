import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, usersReducer, postReducer, postsReducer } from './reducers';

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
	app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
