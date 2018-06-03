import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TimePanel } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add('any', () => <TimePanel time={4721} />)

