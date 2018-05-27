import { toggleVideoState } from '../actions/controls';
import { createReducer } from 'redux-act';
import { PlayerStore } from '../index';

export const createControlsReducer = (store: PlayerStore["controls"]) =>
    createReducer({}, store)
        .on(toggleVideoState, (state, isPlaying) => ({
            ...state,
            isPlaying: !state.isPlaying
        }))
