import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Componente NotFound', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading',
      { name: /Page requested not found/, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(altText);
    expect(img.src).toStrictEqual(src);
  });
});
