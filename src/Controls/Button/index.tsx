import * as classes from './index.pcss';
import * as React from 'react';
interface ButtonProps {
    icon?: SVGComponent;
    onClick?: () => void;
}

export class Button extends React.Component<ButtonProps, {}> {
    render() {
        const {
            icon: Icon,
            onClick = () => {}
        } = this.props;
        return (
            <div
                className={classes.button}
                onClick={onClick}
            >
                { Icon && <Icon className={ classes.button__icon }/> }
            </div>
        );
    }
}
