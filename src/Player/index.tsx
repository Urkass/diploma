import * as React from 'react';
import * as classes from './index.pcss';
import { Controls } from '../Controls';
import { CanvasVideo, Size } from '../CanvasVideo';


export type Config = {
    size: Size;
    src: string;
    autoplay: boolean;
};

export class Player extends React.Component<{config: Config}, {}> {
    render() {
        const { config } = this.props;
        return (
            <div>
                <CanvasVideo
                    className={classes.canvas}
                    size={config.size}
                    src={config.src}
                    autoplay={config.autoplay}
                    />
                <Controls />
            </div>
        )
        ;
    }
}
