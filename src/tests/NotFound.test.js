import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Tests for the NotFound.js component', () => {
  it('Checks if the page has a "H2" element with particular text', () => {
    renderWithRouter(<NotFound />);
    // Finds the "H2" element with the desired text, by using the RegExp method (/string/i), and providing this information to a new const through a screen.getByRole method and informing that we need a 'heading' with the propretys name and level as such.
    const messageDisplays = /page requested not found/i;
    const headingElement = screen.getByRole('heading', {
      name: messageDisplays,
      level: 2,
    });
    // It expects the "H2" element, with the corresponding text fetched by the RegEx method, to be in the document.
    expect(headingElement).toBeInTheDocument();
  });
  it('Checks if there is a Pikachu image in the page', () => {
    renderWithRouter(<NotFound />);
    // This img should be in the page.
    const pikachuImg = screen.getByAltText(/pikachu crying/i);
    // This should be the source of the image fetched above.
    expect(pikachuImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
