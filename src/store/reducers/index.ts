import { combineReducers, Reducer } from 'redux';
import { PlayerStore } from '../index';
import { createControlsReducer } from './createControlsReducer';

export function createRootReducer({ controls }: PlayerStore): Reducer<PlayerStore> {
    return combineReducers({
        controls: createControlsReducer(controls)
    });
}
