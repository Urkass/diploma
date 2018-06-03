import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PlayButton } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add(config.stories['playing'], () => <PlayButton onClick={action('click')} isPlaying={true} />)
    .add(config.stories['paused'], () => <PlayButton onClick={action('click')} isPlaying={false}/>);
