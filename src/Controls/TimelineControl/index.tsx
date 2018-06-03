import * as classes from './index.pcss';
import * as cx from 'classnames';
import * as React from 'react';
import { addEventListener} from '../../utils/addEventListener';

interface TimelineControlProps {
    currentTime: number;
    duration: number;
    onTimeChange?: (time: number) => void;
}

interface TimelineControlState {
    currentTime?: number;
    isButtonDown: boolean;
}

const WIDTH = 350;
const CONTROL_WIDTH = 7;
const TIMELINE_CONTROL_WIDTH = WIDTH - CONTROL_WIDTH;

export class TimelineControl extends React.Component<TimelineControlProps, TimelineControlState> {
    private elem: HTMLDivElement | null;
    private unsubscribeMouseMove: () => void;
    private unsubscribeMouseUp: () => void;

    constructor(props: TimelineControlProps) {
        super(props);
        this.state = {
            isButtonDown: false
        }
    }

    public render() {
        const { duration, currentTime } = this.props;
        
        // const currentTime = this.state.currentTime || this.props.currentTime;
        const width = `${(currentTime / duration) *  TIMELINE_CONTROL_WIDTH + CONTROL_WIDTH + 1}px`;
        console.log(currentTime, width)
        return (
            <div 
                className={classes.timelineControl}
                ref={ (elem) => this.elem = elem }
            >
                <div 
                    className={classes.timelineControl__line}
                    onClick={(e) => this.onClick(e)}
                >
                    <div style={{width }} className={classes.timelineControl__filled}>
                        <div 
                            className={
                                cx(
                                    classes.timelineControl__button,
                                    {
                                        [classes.timelineControl__button_clicked]: this.state.isButtonDown
                                    }
                                )
                            }
                            onMouseDown={(e) => this.onMouseDown(e)}
                            style={{
                                transform: `translateX(${width})`
                            }}
                        />
                    </div>
                </div>
            </div>
            
        );
    }

    private onMouseUp(e: MouseEvent) {
        this.setState({isButtonDown: false})
    }

    private onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        this.setState({isButtonDown: true})
    }

    private onClick(e: React.MouseEvent<HTMLDivElement>) {
        console.log('click');
        e.stopPropagation();
        this.calculateTime(e);
    }

    private calculateTime(e: MouseEvent | React.MouseEvent<HTMLDivElement>) {
        if (!this.elem) {
            return;
        }
        const { left } = this.elem.getBoundingClientRect();
        let filled = e.clientX - CONTROL_WIDTH/2 - left;
        if (filled < 0) {
            filled = 0;
        } else if (filled > TIMELINE_CONTROL_WIDTH) {
            filled = TIMELINE_CONTROL_WIDTH;
        }
        const time = filled * this.props.duration / TIMELINE_CONTROL_WIDTH;
        this.props.onTimeChange && this.props.onTimeChange(time);
    }

    private onMouseMove(e: MouseEvent) {
        if (this.state.isButtonDown) {
            this.calculateTime(e);
        }
    }

    public componentDidMount() {
        this.unsubscribeMouseMove = addEventListener(
            document.documentElement,
            'mousemove',
            (e) => this.onMouseMove(e),
            { passive: true }
        );
        this.unsubscribeMouseUp = addEventListener(
            document.documentElement,
            'mouseup',
            (e) => this.onMouseUp(e),
            { passive: true }
        );
    }

    public componentWillUnmount() {
        this.unsubscribeMouseMove();
        this.unsubscribeMouseUp();
    }
}
