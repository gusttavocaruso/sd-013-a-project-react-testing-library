import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('É exibido na tela a mensagem - No favorite pokemon '
  + 'found -, se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const noFavoritePokemon = screen.queryByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
    expect(noFavoritePokemon).toHaveTextContent('No favorite pokemon found');
  });
});
