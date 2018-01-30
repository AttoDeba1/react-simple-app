import { routerReducer as routing } from 'redux-react-router';
import {combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-react-form';
const rootReducer = combineReducers({
    routing,
    form: formReducer
});
export default rootReducer;
