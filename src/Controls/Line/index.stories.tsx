import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Line } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add(config.stories.horizontal, () => (
        <div style={{background: 'black', display: 'inline-block;', padding: '5px'}}>
            <Line
                currentValue={200}
                size={100}
                maxValue={1000}
                direction={config.stories.horizontal}
                onChange={action('onChange')}
            />
        </div>
    ))
    .add(config.stories.vertical, () => (
        <div style={{background: 'black', display: 'inline-block;', padding: '5px'}}>
            <Line
                currentValue={200}
                size={100}
                maxValue={1000}
                direction={config.stories.vertical}
                onChange={action('onChange')}
            />
        </div>
    ))

