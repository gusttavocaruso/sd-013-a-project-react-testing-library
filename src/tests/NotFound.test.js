import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('notfound.js` tests', () => {
  it('tests if there are a h2 with "Page requested not found" on it', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  it('tests if a gif is shown on the screen', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because the page requested was not/);
    const src = img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(src).toBeTruthy();
  });
});
