import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('testar página NotFoundTest', () => {
  test('Página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });
  test('A página contém a imagem de uma Pokemon chorando', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(
      screen.getByRole('img', {
        name: 'Pikachu crying because the page requested was not found',
      }).src,
    ).toBe(src);
  });
});
