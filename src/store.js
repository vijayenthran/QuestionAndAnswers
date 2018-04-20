import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form';
import authReducer from './reducers/auth';
import thunk from 'redux-thunk';
import {getAuthToken} from './localStorage';
import {setLoggedIn} from './action/auth'

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer
});


const authToken = getAuthToken('auth');

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

// Need this step tp check if there is already auth Token that is created.
// If the Auth token is present then we should be able to automatically send the User to the App page
if(authToken){
    store.dispatch(setLoggedIn(true));
}

// create store with combined reducers because, We will need more than one reducer for our application.


module.exports = {store};
