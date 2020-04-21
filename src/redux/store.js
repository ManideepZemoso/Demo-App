import {createStore,applyMiddleware,compose} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from "./reducers/rootReducer";



function configureStore() {
    const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    );
}

const store=configureStore();
export default store;


