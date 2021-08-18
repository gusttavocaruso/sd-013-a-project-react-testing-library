import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import mockedPokemon from './helpers/mockPokemons';

describe('Testando FavoritePokemons.js', () => {
  test('se é exibido na tela "No favorite pokemon found" caso não haja favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
  test('se são exibidos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [mockedPokemon] } />);
    const pokemon = screen.getByText(/alakazam/i);
    expect(pokemon).toBeInTheDocument();
  });
});
