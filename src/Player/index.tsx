import * as React from 'react';
import * as classes from './index.css';
import { Controls } from '../Controls';

export default class Player extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className={classes.canvas}></div>
                <Controls />
            </div>
        )
        ;
    }
}
