import {connect} from 'react-redux';
import { toggleVideoState } from '../../store/actions/controls';
import { Controls as ControlsComponent } from '../../Controls';
import { PlayerStore } from '../../store';

export interface ControlsStateProps {
    isPlaying: boolean;
}

export interface ControlsDispatchProps {
    toggleVideoState: () => void;
}

export const Controls = connect(
    (state: PlayerStore): ControlsStateProps => ({
        isPlaying: state.controls.isPlaying
    }),
    (dispatch): ControlsDispatchProps => ({
        toggleVideoState: () => dispatch(toggleVideoState()),
    })
)(ControlsComponent);

