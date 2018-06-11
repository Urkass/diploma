import {connect} from 'react-redux';
import { toggleVideoState, onCurrentTimeChanged, onVolumeChanged,
toggleFullscreen } from '../../store/actions/controls';
import { Controls as ControlsComponent } from '../../Controls';
import { PlayerStore } from '../../store';
import { VideoElementApi } from '../../VideoElementApi';
import { toggleFullScreen } from '../../toggleFullScreen';



export interface ControlsStateProps {
    currentVolume: number;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    isFullscreen: boolean;
}

export interface ControlsDispatchProps {
    toggleVideoState: () => void;
    onVolumeChange: (volume: number) => void;
    onTimeChange: (time: number) => void
    toggleFullscreen: () => void;
}

interface OwnControlsProps {
    videoElementApi: VideoElementApi;
}

export const Controls = connect(
    (state: PlayerStore, ownProps: any): ControlsStateProps => {
        return {
            isPlaying: state.controls.isPlaying,
            currentVolume:  state.controls.volume,
            currentTime: state.controls.currentTime,
            duration: state.controls.duration,
            isFullscreen: state.controls.isFullscreen
        }
    },
    (dispatch, {videoElementApi}: OwnControlsProps): ControlsDispatchProps => ({
        toggleVideoState: () => {
            videoElementApi.toggleVideoState();
            dispatch(toggleVideoState());
        },
        onVolumeChange: (volume) => {
            videoElementApi.changeVolume(volume);
            dispatch(onVolumeChanged(volume));
        },
        onTimeChange: (time) => {
            videoElementApi.changeCurrentTime(time);
            dispatch(onCurrentTimeChanged(time))
        },
        toggleFullscreen: () => {
            toggleFullScreen(document);
            dispatch(toggleFullscreen())
        }
    })
)(ControlsComponent);

