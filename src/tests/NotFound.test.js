import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('NotFound.js Test', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('Aplicação contém um "h2" com "Page requested not found"', () => {
    const h2 = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    // passei MUITO TEMPO sofrendo por causa desse emoji pf n façam mais isso
    const EMOJI = screen.getByRole('img', { name: /crying emoji/i });

    expect(h2).toBeInTheDocument();
    expect(EMOJI).toBeInTheDocument();
  });

  test('Aplicação contém gif', () => {
    const img = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img[1].src).toBe(src);
  });
});
