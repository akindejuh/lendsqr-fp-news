import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Button } from '..';

it(`It should render a Button Component`, () => {
  render(<Button />);
  screen.debug();
});
