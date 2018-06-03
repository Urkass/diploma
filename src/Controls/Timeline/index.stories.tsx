import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Timeline } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add('any', () => <Timeline duration={3721} currentTime={525} />)

//onTimeChange={action('onTimeChange')}
