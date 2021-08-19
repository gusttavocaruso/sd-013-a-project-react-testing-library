import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Renderiza a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemonFavorites = screen.getByText(/No favorite pokemon found/);
    expect(noPokemonFavorites).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteText = screen.getByRole('heading', {
      name: /Favorite pokémons/,
      level: 2,
    });
    expect(favoriteText).toBeInTheDocument('Favorite pokémons');
  });
});
