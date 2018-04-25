import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import amaReducer from './reducers/ama';
import thunk from 'redux-thunk';
import {getAuthToken} from './localStorage';
import {setLoggedIn} from './action/auth';
import jwtDecode from 'jwt-decode';
import {getCategories} from "./action/ama"

let userInfo;

// create store with combined reducers because, We will need more than one reducer for our application.
const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    ama : amaReducer
});


const authToken = getAuthToken('auth');

// need to decode the User Info because we need the user id to be stores in the posts collection(database) and comments collection(database)
// In future If we need to filter out the posts specific to a user or comments specific to a user . It would be helpful
if (authToken) {
    userInfo = jwtDecode(authToken);
} else {
    userInfo = null;
}



const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

// Need this step tp check if there is already auth Token that is created.
// If the Auth token is present then we should be able to automatically send the User to the App page
if (authToken) {
    store.dispatch(setLoggedIn({userInfo: userInfo, loggedIn: true}));
}


module.exports = {store};
