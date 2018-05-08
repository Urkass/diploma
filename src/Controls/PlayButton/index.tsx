import * as React from 'react';
import iconPause from './pause.svg';
import iconPlay from './play.svg';
import { Button } from '../Button';


export enum State {
    play = 'PLAY',
    pause = 'PAUSE'
}

interface PlayButtonProps {
    videoState: State;
}

const iconsToStateMapping = {
    [State.play]: iconPlay,
    [State.pause]: iconPause
}

export class PlayButton extends React.Component<PlayButtonProps, {}> {
    render() {
        const { videoState } = this.props;
        return (
            <Button icon={iconsToStateMapping[videoState]} />
        );
    }
}
