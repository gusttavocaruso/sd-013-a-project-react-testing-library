import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Tests for NotFound.js', () => {
  it('Check for h2 with text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('Check if expect gif is shown', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested was not/);
    const src = img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(src).toBeTruthy();
  });
});
