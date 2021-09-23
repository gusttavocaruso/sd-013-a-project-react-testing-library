import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('FavoritePokémon.js Test', () => {
  test('Aplicação avisa se não há pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFav = screen.getByText('No favorite pokemon found');

    expect(noFav).toBeInTheDocument();
  });

  test('Aplicação exibe pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
