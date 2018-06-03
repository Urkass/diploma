import * as classes from './index.pcss';
import * as cx from 'classnames';
import * as React from 'react';
import { addEventListener} from '../../utils/addEventListener';

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}
interface LineProps {
    currentValue: number;
    maxValue: number;
    size: number;
    direction: Direction;
    onChange: (n: number) => void;
}

interface LineState {
    isButtonDown: boolean;
}

const CONTROL_SIZE = 7;

export class Line extends React.Component<LineProps, LineState> {
    private elem: HTMLDivElement | null;
    private unsubscribeMouseMove: () => void;
    private unsubscribeMouseUp: () => void;

    constructor(props: LineProps) {
        super(props);
        this.state = {
            isButtonDown: false
        }
    }

    private addModifiers(cls: string[] | string, name: string, direction: Direction) {
        return cx(
            cls,
            {
                [(classes as any)[`${name}_direction_vertical`]]: direction === Direction.vertical,
                [(classes as any)[`${name}_direction_horizontal`]]: direction === Direction.horizontal
            }
        )
    }

    public render() {
        const lineStyle: Record<string, string> = {};
        const filledStyle: Record<string, string> = {};
        const buttonStyle: Record<string, string> = {};
        const { direction, size, maxValue, currentValue } = this.props;
        const timelineSize = size - CONTROL_SIZE;
        const offset = (currentValue / maxValue) * timelineSize; //+ CONTROL_SIZE/2 + 1;

        if (direction === Direction.horizontal) {
            filledStyle.width = `${offset}px`;
            lineStyle.width = `${size}px`;
            buttonStyle.transform = `translateX(${offset}px)`;
        } else if (direction === Direction.vertical) {
            filledStyle.height = `${offset}px`;
            lineStyle.height = `${size}px`;
            buttonStyle.transform = `translateY(${offset}px)`;
        }
        
        return (
                <div 
                    className={this.addModifiers(
                        classes.line,
                        'line',
                        direction
                    )}
                    onClick={(e) => this.onClick(e)}
                    ref={(elem) => this.elem = elem}
                    style={lineStyle}
                >
                    <div style={filledStyle} className={classes.line__filled}>
                        <div 
                            className={
                                cx(
                                    this.addModifiers(
                                        classes.line__button,
                                        'line__button',
                                        direction
                                    ),
                                    {
                                        [classes.line__button_clicked]: this.state.isButtonDown
                                    }
                                )
                            }
                            onMouseDown={(e) => this.onMouseDown(e)}
                            style={buttonStyle}
                        />
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
        this.onChange(e);
    }

    private onMouseMove(e: MouseEvent) {
        if (this.state.isButtonDown) {
            this.onChange(e);
        }
    }

    private onChange(
        e: MouseEvent | React.MouseEvent<HTMLDivElement>
    ) {
        if (!this.elem) {
            return;
        }
        const rect = this.elem.getBoundingClientRect();
        const timelineSize = this.props.size - CONTROL_SIZE;
        let filled = 0; 
        if (this.props.direction === Direction.horizontal) {
            filled = e.clientX - CONTROL_SIZE / 2 - rect.left;
        } else if (this.props.direction === Direction.vertical) {
            filled = e.clientY - CONTROL_SIZE / 2 - rect.top;
        }
        if (filled < 0) {
            filled = 0;
        } else if (filled > timelineSize) {
            filled = timelineSize;
        }
        const time = filled * this.props.maxValue / timelineSize;
        this.props.onChange && this.props.onChange(time);
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
