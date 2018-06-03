import * as React from 'react';
import { PlayButton } from './PlayButton';
import { Volume } from './Volume';
import { Timeline } from './Timeline';
import * as classes from './index.pcss';
import { ControlsDispatchProps, ControlsStateProps} from '../containers/Controls';


type ControlsProps = ControlsDispatchProps & ControlsStateProps;

export class Controls extends React.Component<ControlsProps, {}> {
    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.controls}>
                    <PlayButton 
                        isPlaying={this.props.isPlaying}
                        onClick={this.props.toggleVideoState}
                    />
                    <Volume 
                        currentVolume={this.props.currentVolume}
                        onVolumeChange={this.props.onVolumeChange}
                    />
                    <Timeline 
                        currentTime={this.props.currentTime}
                        duration={this.props.duration}
                        onTimeChange={this.props.onTimeChange}
                    />
                </div>
            </div>
        );
    }
}
