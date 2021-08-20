import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('FavoritePokemons.js tests', () => {
  test('É exibido na tela "no favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  test('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    const pokemon1 = screen.queryAllByTestId('pokemon-name');

    expect(pokemon1).toBeDefined();
  });
});
