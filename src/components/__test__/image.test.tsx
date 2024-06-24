import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Image } from '..';

it(`It should render the Image Component`, () => {
  render(
    <Image
      sourceFile={{
        uri: 'https://www.google.com',
      }}
    />,
  );
  screen.debug();
});
