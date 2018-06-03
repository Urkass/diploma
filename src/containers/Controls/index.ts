import {connect} from 'react-redux';
import { toggleVideoState } from '../../store/actions/controls';
import { Controls as ControlsComponent } from '../../Controls';
import { PlayerStore } from '../../store';

export interface ControlsStateProps {
    currentVolume: number;
    currentTime: number;
    duration: number;
    isPlaying: boolean;

}

export interface ControlsDispatchProps {
    toggleVideoState: () => void;
    onVolumeChange: (volume: number) => void;
    onTimeChange: (time: number) => void
}

export const Controls = connect(
    (state: PlayerStore): ControlsStateProps => ({
        isPlaying: state.controls.isPlaying,
        currentVolume: 20,
        currentTime: 300,
        duration: 2000
    }),
    (dispatch): ControlsDispatchProps => ({
        toggleVideoState: () => dispatch(toggleVideoState()),
        onVolumeChange: () => {},
        onTimeChange: () => {}
    })
)(ControlsComponent);

