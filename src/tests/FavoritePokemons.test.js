import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import historyComponent from '../components/historyComponent';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Verifica se aparece a mensagem quando não há pokemons favoritos', () => {
    historyComponent(<FavoritePokemons pokemons={ [] } />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});

// Não fiz o teste do "se é exibido todos os cards de pokémons favoritados".
