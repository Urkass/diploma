import { toggleVideoState, onCurrentTimeChanged, onDurationChanged, onVolumeChanged, toggleFullscreen } from '../actions/controls';
import { createReducer } from 'redux-act';
import { PlayerStore } from '../index';

export const createControlsReducer = (store: PlayerStore["controls"]) =>
    createReducer({}, store)
        .on(toggleVideoState, (state) => ({
            ...state,
            isPlaying: !state.isPlaying
        }))
        .on(onCurrentTimeChanged, (state, currentTime) => ({
            ...state,
            currentTime
        }))
        .on(onDurationChanged, (state, duration) => ({
            ...state,
            duration
        }))
        .on(onVolumeChanged, (state, volume) => ({
            ...state,
            volume
        }))
        .on(toggleFullscreen, (state) => ({
            ...state,
            isFullscreen: !state.isFullscreen
        }))
