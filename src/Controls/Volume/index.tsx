import * as classes from './index.pcss';
// import * as cx from 'classnames';
import * as React from 'react';
import iconVolumeOff from '!svg-react-loader!./volumeOff.svg';
import iconVolumeOn from '!svg-react-loader!./volumeOn.svg';
import { Button } from '../Button';
import { Line, Direction } from '../Line';

interface VolumeProps {
    currentVolume: number;
    onVolumeChange?: (volume: number) => void;
}

interface VolumeState {
    currentVolume?: number;
    cachedVolume: number;
    isHovered: boolean;
}

const HEIGHT = 53;

export class Volume extends React.Component<VolumeProps, VolumeState> {
    private onVolumeChange: (volume: number) => void;
    private visibleTimeout: number;

    constructor(props: VolumeProps) {
        super(props);
        this.state = {
            cachedVolume: props.currentVolume > 0 ? 0 : 0.5,
            isHovered: false
        };
        if (!props.onVolumeChange) {
            this.onVolumeChange = (currentVolume) => this.setState({currentVolume});
        } else {
            this.onVolumeChange = props.onVolumeChange;
        }
    }

    render() {
        const currentVolume = this.getCurrentVolume();
        const icon = currentVolume === 0 ? iconVolumeOff : iconVolumeOn;
        return (
            <div className={classes.container}>
                {
                    this.state.isHovered && <div
                        className={classes.volume}
                        onMouseOver={() => this.onMouseOver()}
                        onMouseOut={() => this.onMouseOut()}
                    >
                        <Line
                            currentValue={currentVolume}
                            size={HEIGHT}
                            maxValue={1}
                            direction={Direction.vertical}
                            onChange={(volume) => this.onVolumeChange(volume)}
                        />
                    </div>
                }
                <Button 
                    onClick={() => this.onClick()}
                    onMouseOver={() => this.onMouseOver()}
                    onMouseOut={() => this.onMouseOut()}
                    icon={icon} 
                />
            </div>
        );
    }

    private onMouseOver() {
        clearTimeout(this.visibleTimeout);
        this.setState({isHovered: true});
    }

    private onMouseOut() {
        this.visibleTimeout = setTimeout(() => {
            this.setState({isHovered: false});
        }, 1000)
    }

    private onClick() {
        this.setState({
            cachedVolume: this.getCurrentVolume()
        });
        this.onVolumeChange(this.state.cachedVolume);
    }

    private getCurrentVolume() {
        return this.state.currentVolume === undefined
            ? this.props.currentVolume
            : this.state.currentVolume;
    }
}
