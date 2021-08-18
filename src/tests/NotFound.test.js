import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { NotFound } from '../components';

describe('Testando FavoritePokemons.js', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  test('se a página contém um "h2" com o texto "Page requested not found"', () => {
    // renderWithRouter(<NotFound />);
    const h2Element = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2,
    });
    const spanElement = screen.getByRole('img', {
      name: /crying emoji/i,
    });
    expect(spanElement).toBeInTheDocument();
    expect(h2Element).toBeInTheDocument();
  });
  test('se a página mostra a imagem do pikachu tristinho', () => {
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgElement = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(imgElement.src).toStrictEqual(image);
  });
});
