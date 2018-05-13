import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PlayButton, State as PlayButtonState } from '.';
const config = require('./index.gemini');

storiesOf(config.name, module)
    .add(config.stories['playing'], () => <PlayButton onClick={action('click')} videoState={PlayButtonState.play} />)
    .add(config.stories['paused'], () => <PlayButton onClick={action('click')} videoState={PlayButtonState.pause} />);
