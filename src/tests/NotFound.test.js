import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 4', () => {
  test('A página contém um heading "h2"', () => {
    renderWithRouter(<NotFound />);

    const header = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(header).toBeInTheDocument();
  });

  it('A página mostra imagem', () => {
    renderWithRouter(<NotFound />);

    const altText = /Pikachu crying because the page requested was not found/i;
    const img = screen.getByAltText(altText);

    const endImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toEqual(endImg);
  });
});
