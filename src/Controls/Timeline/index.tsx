import * as classes from './index.pcss';
// import * as cx from 'classnames';
import * as React from 'react';
import { TimePanel } from '../TimePanel';
import { TimelineControl } from '../TimelineControl';

interface TimelineProps {
    currentTime: number;
    duration: number;
    onTimeChange?: (time: number) => void;
}

interface TimelineState {
    currentTime?: number;
}

export class Timeline extends React.Component<TimelineProps, TimelineState> {
    private onTimeChange: (time: number) => void;

    constructor(props: TimelineProps) {
        super(props);
        this.state = {};
        if (!props.onTimeChange) {
            this.onTimeChange = (currentTime) => this.setState({currentTime});
        } else {
            this.onTimeChange = props.onTimeChange;
        }
    }

    render() {
        const { duration } = this.props;
        const currentTime = this.state.currentTime === undefined
            ? this.props.currentTime
            : this.state.currentTime;
        return (
            <div className={classes.timeline}>
                <TimePanel time={currentTime} />
                <TimelineControl 
                    {...this.props}
                    currentTime={currentTime}
                    onTimeChange={(e) => this.onTimeChange(e)}
                />
                <TimePanel time={duration} />
            </div>
            
        );
    }
}
