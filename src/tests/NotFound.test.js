import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  test('Testa se página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const texth2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(texth2).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    // não consegui achar or getByRole('img');
    const imgNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
