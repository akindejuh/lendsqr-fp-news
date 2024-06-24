import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NewsListingComp } from '..';

it(`It should render the News Listing Component`, () => {
  render(
    <NewsListingComp
      id={'Test ID'}
      title={'Test Title'}
      topic={'Test Topic'}
      image_url={'https://www.google.com'}
      publication_date={'31-08-2008'}
    />,
  );
  screen.debug();
});
