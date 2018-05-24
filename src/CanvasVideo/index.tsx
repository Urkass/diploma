import * as React from 'react';
// import * as classes from './index.pcss';

export type Size = {
    width: number;
    height: number;
}

export type CanvasVideoProps = {
    src: string;
    className: string;
    size: Size;
    autoplay: boolean;
};

export class CanvasVideo extends React.Component<CanvasVideoProps, {}> {

    private videoElement = this.makeVirtualVideoElement(this.props.src)
    private canvasRef: HTMLCanvasElement | null;

    render() {
        return (
            <canvas
                ref={canvasRef => this.canvasRef = canvasRef}
            />            
        );
    }
    
    componentDidMount() {
        const { canvasRef, videoElement } = this;
        if (!canvasRef) {
            return;
        }
        const context = canvasRef.getContext('2d');
        if (!context) {
            return;
        }
        canvasRef.width = this.props.size.width;
        canvasRef.height = this.props.size.height;
        const playListener = () => {
            this.draw(videoElement, context, canvasRef.width, canvasRef.height);
        }
        videoElement.addEventListener('play', () => playListener());

        if (this.props.autoplay) {
            videoElement.play();
        }
    }

    private draw (
        video: HTMLVideoElement,
        context: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
    ) {
        context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
        requestAnimationFrame( () => this.draw(video,context, canvasWidth, canvasHeight));

    }

    private makeVirtualVideoElement (src: string) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', src);
        video.appendChild(source);
        return video;
    }
}
