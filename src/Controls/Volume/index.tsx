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

    constructor(props: VolumeProps) {
        super(props);
        this.state = {
            cachedVolume: props.currentVolume > 0 ? 0 : 50,
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
                <div className={classes.volume}>
                    <Line
                        currentValue={currentVolume}
                        size={HEIGHT}
                        maxValue={100}
                        direction={Direction.vertical}
                        onChange={(volume) => this.onVolumeChange(volume)}
                    />
                </div>
                <Button 
                    onClick={() => this.onClick()}
                    icon={icon} 
                />
            </div>
        );
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
