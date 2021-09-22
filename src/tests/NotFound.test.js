import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('4- Testa o componente NotFound.js', () => {
  beforeEach(() => renderWithRouter(<NotFound />));
  test('A página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    const heading = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
