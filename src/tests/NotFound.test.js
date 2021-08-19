import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Verifica o componente Not Found', () => {
  it('Verifica se página contém um heading ', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
