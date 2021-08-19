import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../types/renderWithRouter';
import App from '../App';

describe('Testa componente NotFound', () => {
  test('Teste se página contém um heading h2', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const nFoundHeading = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(nFoundHeading).toBeInTheDocument();
  });

  test('Teste se página mostra uma imagem', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const pokedexImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(pokedexImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
