import * as classes from './index.pcss';
// import * as cx from 'classnames';
import * as React from 'react';
import { TimePanel } from '../TimePanel';
import { Line, Direction } from '../Line';
import { InterfaceSizes } from '../';


interface TimelineProps {
    currentTime: number;
    duration: number;
    onTimeChange?: (time: number) => void;
    interfaceSize?: InterfaceSizes;
}

interface TimelineState {
    currentTime?: number;
}

const WIDTH = 350;
const WIDTH_L = 700

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
        const { duration, interfaceSize } = this.props;
        const currentTime = this.state.currentTime === undefined
            ? this.props.currentTime
            : this.state.currentTime;
        return (
            <div className={classes.timeline}>
                <TimePanel time={currentTime} />
                <Line
                    currentValue={currentTime}
                    size={
                        (
                            interfaceSize &&
                            this.props.interfaceSize === InterfaceSizes.L
                        ) ? WIDTH_L : WIDTH
                    }
                    maxValue={duration}
                    direction={Direction.horizontal}
                    onChange={(time) => this.onTimeChange(time)}
                />
                <TimePanel time={duration} />
            </div>
            
        );
    }
}
