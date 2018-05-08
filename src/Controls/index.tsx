import * as React from 'react';
import { PlayButton, State } from './PlayButton';

export class Controls extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <PlayButton videoState={State.play} />
            </div>
        );
    }
}

