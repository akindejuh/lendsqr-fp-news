import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Button } from '..';

it(`It should render the button`, () => {
  render(<Button />);
  screen.debug();
});
