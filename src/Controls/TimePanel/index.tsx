import * as classes from './index.pcss';
// import * as cx from 'classnames';
import * as React from 'react';

interface TimelineProps {
    time: number;
}


const format = (function () {
    let cache: {[key: number]: string;} = {};

    const addZero = (n: number) => {
        const str = `${n}`;
        return str.length === 1 ? `0${str}` : str
    }

    return (time: number) => {
        if (cache[time]) {
           return cache[time];
        } else {
            const ss = time % 60;
            const mmAndhh = ( time - ss ) / 60;
            const mm = mmAndhh % 60;
            const hh = ( mmAndhh - mm ) / 60;
            return cache[time] = `${addZero(hh)}:${addZero(mm)}:${addZero(Math.round(ss))}`;
        }
        
    }
})()


export class TimePanel extends React.Component<TimelineProps, {}> {
    render() {
        const preparedTime = format(this.props.time);
        return (
            <div className={classes.timePanel}>{preparedTime}</div>
        );
    }
}
