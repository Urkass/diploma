import * as React from 'react';
import { PlayButton, State } from './PlayButton';
import * as classes from './index.pcss';
import { ControlsDispatchProps, ControlsStateProps} from '../containers/Controls';


type ControlsProps = ControlsDispatchProps & ControlsStateProps;

export class Controls extends React.Component<ControlsProps, {}> {
    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.controls}>
                    <PlayButton 
                        videoState={this.props.isPlaying ? State.play : State.pause}
                        onClick={this.props.toggleVideoState}
                    />
                </div>
            </div>
        );
    }
}
