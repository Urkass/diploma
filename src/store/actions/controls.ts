import { createAction } from 'redux-act';

export const toggleVideoState = createAction('TOGGLE_VIDEO_STATE');
export const onCurrentTimeChanged = createAction<number>('ON_CURRENT_TIME_CHANGED');
export const onDurationChanged = createAction<number>('ON_DURATION_CHANGED');
export const onVolumeChanged = createAction<number>('ON_VOLUME_CHANGED');
export const toggleFullscreen = createAction('TOGGLE_FULLSCREEN');
