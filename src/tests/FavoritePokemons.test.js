import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import historyRender from '../components/History';

describe('Testa o componente About', () => {
  test('Testa se aparece a mensagem quando há pokemons favoritos', () => {
    historyRender(<FavoritePokemons pokemons={ [] } />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
