import * as React from 'react';
import { PlayButton } from './PlayButton';
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
                </div>
            </div>
        );
    }
}
