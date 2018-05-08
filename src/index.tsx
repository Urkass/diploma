import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Player, Config } from './Player';
interface VideoPlayerWindow extends Window {
    videoPlayer?: {
        create?: (node: HTMLElement, config: Config) => void;
    }
}

const win = window as VideoPlayerWindow;

win.videoPlayer = win.videoPlayer || {};
win.videoPlayer.create = (node: HTMLElement | string, config: Config) => {
    const el = typeof node === 'string'
        ? document.getElementById(node)
        : node;
    ReactDOM.render(<Player config={config}/>, el);
}
