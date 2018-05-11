import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PlayButton, State as PlayButtonState } from '.';

storiesOf('PlayButton', module).add('with text', () => (
    <PlayButton onClick={action('click')} videoState={PlayButtonState.play} />
));
