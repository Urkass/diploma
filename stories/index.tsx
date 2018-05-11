import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../src/Controls/Button';
import { PlayButton, State as PlayButtonState } from '../src/Controls/PlayButton';

storiesOf('Button', module)
  .add('with text', () => (
    <Button />
  ));   

  storiesOf('PlayButton', module)
  .add('with text', () => (
    <PlayButton onClick={action('click')} videoState={PlayButtonState.play}/>
  ));   
