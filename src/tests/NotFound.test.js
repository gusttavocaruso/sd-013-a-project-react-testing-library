import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando NotFound.js', () => {
  test('Teste se a página tem um h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji', level: 2,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  test('Teste se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
