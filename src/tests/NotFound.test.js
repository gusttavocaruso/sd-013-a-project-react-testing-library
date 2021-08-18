import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  it('Testa se página tem um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });

  it('Testa se página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);

    const alt = /Pikachu crying because the page requested was not found/i;
    const image = screen.getByAltText(alt);

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toHaveAttribute('src', src);
  });
});
