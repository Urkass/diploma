import * as React from 'react';
import * as classes from './index.pcss';
import { Controls } from '../Controls';

export type Config = any;

export class Player extends React.Component<{config: Config}, {}> {
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
