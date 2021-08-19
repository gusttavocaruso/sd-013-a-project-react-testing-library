import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('', () => {
  it('Looks for a particular header', () => {
    render(<NotFound />);
    // this h2 should be in the page
    const messageDisplays = /page requested not found/i;
    const headingElement = screen.getByRole('heading', {
      name: messageDisplays,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
  });
  it('Looks for the Pikachu image is in the page', () => {
    render(<NotFound />);
    // This img should be in the page
    const pikachuImg = screen.getByAltText(/pikachu crying/i);
    // This should be the source of the image fetched above
    expect(pikachuImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

test('', () => {});
