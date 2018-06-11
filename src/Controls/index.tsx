import * as React from 'react';
import { PlayButton } from './PlayButton';
import { Volume } from './Volume';
import { Timeline } from './Timeline';
import { FullscreenButton } from './FullscreenButton';
import * as classes from './index.pcss';
import { ControlsDispatchProps, ControlsStateProps} from '../containers/Controls';

type ControlsProps = ControlsDispatchProps & ControlsStateProps;

export enum InterfaceSizes {
    S = 'S',
    L = 'L'
}

export class Controls extends React.Component<ControlsProps, {}> {
    render() {
        const interfaceSize = this.props.isFullscreen ? InterfaceSizes.L : InterfaceSizes.S;
        return (
            <div
                className={classes.videoWrapper}
                onClick={() => this.props.toggleVideoState()}
            >
                <div
                    className={classes.controls}
                >
                    <div
                        className={classes.wrapper}
                        onClick={(e) => e.stopPropagation()}
                    >
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
                            interfaceSize={interfaceSize}
                        />
                        <FullscreenButton
                            isFullscreen={this.props.isFullscreen}
                            onClick={this.props.toggleFullscreen}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
