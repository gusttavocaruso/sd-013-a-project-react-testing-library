import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa componente "NotFound"', () => {
  it('Testa se a página tem o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página tem a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img[1].src).toBe(src);
  });
});
