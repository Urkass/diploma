import { PlayerStore } from '../store';
import { Store } from 'redux';
import { onCurrentTimeChanged, onDurationChanged, onVolumeChanged } from '../store/actions/controls';
import { throttle } from 'lodash';




interface Settings {
    autoplay: boolean;
}
export class VideoElementApi {
    private isPlaying: boolean;
    private store: Store<PlayerStore>;
    constructor (
        private video: HTMLVideoElement,
        { autoplay }: Settings,
    ) {
        this.video.autoplay = autoplay;
        if (autoplay) {
            this.isPlaying = true;
            this.video.play();
        }
        this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.video.addEventListener('durationchange', () => this.onDurationChanged());
        this.video.addEventListener('volumechange', () => this.onVolumeChanged());
    }

    public toggleVideoState() {
        if (this.isPlaying) {
            this.video.pause();
        } else {
            this.video.play();
        }
        this.isPlaying = !this.isPlaying;
    }
    
    public onTimeUpdate() {
        this.store.dispatch(onCurrentTimeChanged(this.video.currentTime));
    }

    public changeCurrentTime(time: number) {
        this.video.currentTime = time;
    }

    public setCurrentTime(currentTime: number) {
        this.video.currentTime = currentTime;
    }

    public getCurrentTime() {
        return this.video.currentTime;
    }

    public setStore(store: Store<PlayerStore>) {
        this.store = store;
    }

    public onDurationChanged() {
        this.store.dispatch(onDurationChanged(this.video.duration));
    }

    public onVolumeChanged() {
        this.store.dispatch(onVolumeChanged(this.video.volume));
    }

    public changeVolume(volume: number) {
        this.video.volume = volume;
    }

    public getVolume() {
        return this.video.volume;
    }
}
