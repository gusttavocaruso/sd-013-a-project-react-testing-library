import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemonsData from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = pokemonsData;

    renderWithRouter(
      <FavoritePokemons
        pokemons={ pokemons }
      />,
    );

    pokemons.forEach((pokemon) => {
      const card = screen.getByText(pokemon.name);

      expect(card).toBeInTheDocument();
    });
  });
});
