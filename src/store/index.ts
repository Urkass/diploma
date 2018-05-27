import { createStore, compose } from 'redux';
import { createRootReducer } from './reducers';


export interface PlayerStore {
    video: {

    },
    controls: {
        isPlaying: boolean;
    }
}

const devToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState: PlayerStore) =>
    createStore(createRootReducer(initialState), devToolsCompose());
