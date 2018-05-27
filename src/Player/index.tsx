import * as React from 'react';
import * as classes from './index.pcss';
import { Controls } from '../containers/Controls';
import { CanvasVideo, Size } from '../CanvasVideo';
import { PlayerStore, configureStore } from '../store';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export type Config = {
    size: Size;
    src: string;
    autoplay: boolean;
    changeWithDiv: boolean;
};

interface PlayerProps {
    config: Config;
}

export class Player extends React.Component<PlayerProps, {}> {
    private store: Store<PlayerStore>;
    constructor(props: PlayerProps) {
        super(props);
        this.store = configureStore({
            video: {},
            controls: {
                isPlaying: false
            }
        });
    }

    render() {
        const { config } = this.props;
        return (
            <Provider store={this.store}>
                <div>
                    {config.changeWithDiv ? (
                        <div
                            style={{
                                width: `${config.size.width}px`,
                                height: `${config.size.height}px`,
                                background: '#e6fffb'
                            }}
                        >
                            <Controls />
                        </div>
                    ) : (
                        <CanvasVideo
                            className={classes.canvas}
                            size={config.size}
                            src={config.src}
                            autoplay={config.autoplay}
                        >
                            <Controls />
                        </CanvasVideo>
                    )}
                </div>
            </Provider>
        );
    }
}
