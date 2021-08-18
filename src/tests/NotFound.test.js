import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test "NotFound" page', () => {
  it('Renders "page not found" text', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', { level: 2 });
    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  });

  it('Renders "page not found" image', () => {
    renderWithRouter(<NotFound />);

    const altText = 'Pikachu crying because the page requested was not found';
    const notFoundImg = screen.getByAltText(altText);
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
