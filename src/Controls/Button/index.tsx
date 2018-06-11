import * as classes from './index.pcss';
import * as cx from 'classnames';
import * as React from 'react';

interface ButtonProps {
    icon?: SVGComponent;
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    isIconFilled?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        const {
            icon: Icon,
            onClick = () => {},
            isIconFilled,
            onMouseOver,
            onMouseOut
        } = this.props;
        return (
            <div
                className={cx(
                    classes.button
                )}
                onClick={onClick}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                { Icon && <Icon className={ 
                    cx(
                        classes.button__icon,
                        {
                            [classes.button__icon_filled]: isIconFilled
                        }
                    )}/> }
            </div>
        );
    }
}
