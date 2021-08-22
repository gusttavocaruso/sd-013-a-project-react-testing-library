import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  test('se página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const heading2 = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(heading2).toBeInTheDocument();
  });

  test('se página mostra a imagem do pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByAltText(/Pikachu crying/i);
    const expectedSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImg.src).toEqual(expectedSrc);
  });
});
