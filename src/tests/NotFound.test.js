import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o component "NotFound"', () => {
  test('Testa se há um heading com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const readingNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i });

    expect(readingNotFound).toBeInTheDocument();
  });

  test('Testa se a página mostra uma imagem do tipo "gif"', () => {
    renderWithRouter(<NotFound />);
    const imageGif = screen.getByAltText(/the page requested was not found/i);

    expect(imageGif).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
