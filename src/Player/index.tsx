import * as React from 'react';
import * as classes from './index.pcss';
import { Controls } from '../containers/Controls';
import { CanvasVideo, Size } from '../CanvasVideo';
import { PlayerStore, configureStore } from '../store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { VideoElementApi } from '../VideoElementApi';


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
    private videoElement = this.makeVirtualVideoElement(this.props.config.src);
    private videoElementApi: VideoElementApi;
    constructor(props: PlayerProps) {
        super(props);
        this.videoElementApi = new VideoElementApi(
            this.videoElement,
            { autoplay: this.props.config.autoplay }
        );
        this.store = configureStore({
            video: {},
            controls: {
                duration: 0,
                volume: this.videoElementApi.getVolume(),
                currentTime: this.videoElementApi.getCurrentTime(),
                isPlaying: !this.props.config.autoplay,
                isFullscreen: false
            }
        });

        this.videoElementApi.setStore(this.store);
        
    }
    

    render() {
        const { config } = this.props;
        const controls = <Controls videoElementApi={this.videoElementApi }/>;
        
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
                            {controls}
                        </div>
                    ) : (
                        <CanvasVideo
                            className={classes.canvas}
                            size={config.size}
                            src={config.src}
                            autoplay={config.autoplay}
                            videoElement={this.videoElement}
                            // isFullscreen={this.store.getState().controls.isFullscreen}
                        >
                            {controls}
                        </CanvasVideo>
                    )}
                </div>
            </Provider>
        );
    }

    private makeVirtualVideoElement (src: string) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', src);
        video.appendChild(source);
        return video;
    }
}
