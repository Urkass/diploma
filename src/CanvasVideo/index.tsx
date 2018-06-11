import {connect} from 'react-redux';
import * as React from 'react';
import { PlayerStore } from '../store';
import * as cx from 'classnames';
import * as classes from './index.pcss';

export type Size = {
    width: number;
    height: number;
}

export type CanvasVideoProps = {
    src: string;
    className: string;
    size: Size;
    autoplay: boolean;
    videoElement: HTMLVideoElement;
};

type CanvasVideoPropsFromRedux = {
    isFullscreen: boolean;
}

class CanvasVideoComponent extends React.Component<CanvasVideoProps & CanvasVideoPropsFromRedux, {}> {

    private canvasRef: HTMLCanvasElement | null;
    private width: number;
    private height: number;

    render() {
        // if (this.canvasRef) {
        //     this.canvasRef.width = this.width;
        //     this.canvasRef.height = this.height;
        // }
        this.sizeChecker();
        return (
            <div
                style={{
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                }}
                className={cx({
                    [classes.canvasVideo_fullscreen]: this.props.isFullscreen
                })}
            >
                <canvas
                ref={canvasRef => this.canvasRef = canvasRef}
            />
                {this.props.children}
            </div>
        );
    }

    private sizeChecker() {
        let { width, height } =  this.props.size;
        if (this.width !== undefined && this.height !== undefined) {
            if (this.props.isFullscreen) {
                width = window.outerWidth;
                height = window.outerHeight;
            }
            if (width !== this.width && height !== this.height && this.canvasRef) {
                this.canvasRef.width = width;
                this.canvasRef.height = height;
            }
        }
        this.width = width;
        this.height = height;
    }
    
    componentDidMount() {
        this.createCanvas();
    }

    private createCanvas() {
        const { canvasRef } = this;
        const { videoElement } = this.props;
        if (!canvasRef) {
            return;
        }
        const context = canvasRef.getContext('2d');
        if (!context) {
            return;
        }
        canvasRef.width = this.width;
        canvasRef.height = this.height;
        const playListener = () => {
            this.draw(videoElement, context, canvasRef.width, canvasRef.height);
        }

        videoElement.addEventListener('play', () => playListener());
    }

    private draw (
        video: HTMLVideoElement,
        context: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
    ) {
        context.drawImage(video, 0, 0, this.width, this.height);
        requestAnimationFrame( () => this.draw(video,context, this.width, this.height));

    }
}

export const CanvasVideo = connect(
    (state: PlayerStore, ownProps: CanvasVideoProps): CanvasVideoProps & CanvasVideoPropsFromRedux => {
        return {
            isFullscreen: state.controls.isFullscreen,
            ...ownProps
        }
    }
)(CanvasVideoComponent);
