import React from 'react';
import { render } from '@testing-library/react-native';
import { NewsListingComp } from '..';

describe('News Listing Component', () => {
  it(`It should render the component`, () => {
    const screen = render(
      <NewsListingComp
        id="Test ID"
        title="Test Title"
        topic="Test Topic"
        image_url="https://www.google.com"
        publication_date="31-08-2008"
        author="Test Author"
      />,
    );
    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it(`It should throw an error with no props added`, () => {
    const page = () => render(<NewsListingComp />);
    expect(page).toThrow();
  });
});
