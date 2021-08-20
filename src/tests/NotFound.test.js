import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes para NotFound', () => {
  it('Verifica se a pagina contem um "h2"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/);
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se renderiza a imagem na tela', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because the page requested was not/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
