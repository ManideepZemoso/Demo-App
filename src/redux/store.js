import {createStore,applyMiddleware,compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from "./reducers/rootReducer";
import thunk from 'redux-thunk';


function configureStore() {
    const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(),thunk))
    );
}

const store=configureStore();
export default store;


