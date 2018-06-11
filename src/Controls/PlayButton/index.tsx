import * as React from 'react';
import iconPause from '!svg-react-loader!./pause.svg';
import iconPlay from '!svg-react-loader!./play.svg';
import { Button } from '../Button';

export enum State {
    play = 'PLAY',
    pause = 'PAUSE'
}

interface PlayButtonProps {
    isPlaying: boolean;
    onClick?: () => void;
}

const iconsToStateMapping = {
    [State.play]: iconPlay,
    [State.pause]: iconPause
}

export class PlayButton extends React.Component<PlayButtonProps, {}> {
    render() {
        const { isPlaying, onClick } = this.props;
        const videoState = isPlaying ? State.play : State.pause;
        return (
            <Button
                onClick={onClick}
                icon={iconsToStateMapping[videoState]}
            />
        );
    }
}
