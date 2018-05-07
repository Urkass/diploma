import * as classes from './index.css';
import * as React from 'react';

export class Button extends React.Component<{}, {}> {
    render() {
        return <div className={classes.button}>Play</div>;
    }
}
