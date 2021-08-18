import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing NotFound component', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Test if the page has the text "Page requested not found"', () => {
    const msg = screen.getByText('Page requested not found');

    expect(msg).toBeInTheDocument();
  });

  it('Test if the "src" attribute of the image is correct', () => {
    const img = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img[1].src).toBe(src);
  });
});
