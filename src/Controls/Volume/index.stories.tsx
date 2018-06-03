import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Volume } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add(config.stories.common, () => (
    <div style={{
        width: '300px',
        height: '200px',
        position: 'relative'
    }}>
        <div style={{
            position: 'absolute',
            bottom: '0',
            left: '100px'
        }}>
            <Volume currentVolume={21} />
        </div>
    </div>
));
