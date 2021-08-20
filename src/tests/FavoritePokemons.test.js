import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import { pokemons } from './mocks/dataFavorite';
import renderWithRouter from './util/renderWithRouter';
// console.log(pokemons);
// let mockPokemons = pokemons.map((pokemon) => (<Pokemon key={ pokemon.id } pokemon={ pokemon } isFavorite />));
describe('1 - Teste o componente <FavoritePokemons.js />', () => {
  it('1.1 - É exibido na tela a mensagem - No favorite pokemon '
  + 'found -, se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const noFavoritePokemon = screen.queryByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
    expect(noFavoritePokemon).toHaveTextContent('No favorite pokemon found');
  });
  it('1.2 - Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const favoritePokemons = screen.queryAllByTestId(/pokemon-name/i);
    favoritePokemons.forEach((pokemon, index) => {
      expect(pokemon).toBeInTheDocument();
      const { name } = pokemons[index];
      expect(pokemon).toHaveTextContent(name);
    });
    expect(favoritePokemons.length).toEqual(pokemons.length);
  });
});
