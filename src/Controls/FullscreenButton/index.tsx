import * as React from 'react';
import iconFullscreenOff from '!svg-react-loader!./fullscreenOff.svg';
import iconFullscreenOn from '!svg-react-loader!./fullscreenOn.svg';
import { Button } from '../Button';

interface PlayButtonProps {
    isFullscreen: boolean;
    onClick?: () => void;
}

export class FullscreenButton extends React.Component<PlayButtonProps, {}> {
    render() {
        const { isFullscreen, onClick } = this.props;
        const icon = isFullscreen ? iconFullscreenOff : iconFullscreenOn;
        return (
            <Button onClick={onClick} icon={icon}/>
        );
    }
}
