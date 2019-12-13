import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import WholeDataReducer from './Reducer/WholeDataReducer';
import SaveHistoryReducer from './Reducer/SaveUserRideHistoryMiddileWare';

const rootReducer = combineReducers({
    WholeDataReducer,
    SaveHistoryReducer
});
let middleWare = applyMiddleware(thunk);

const store = createStore(rootReducer, middleWare);

export default store;
