import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Testando a págin de favoritos', () => {
  it('Testando caso não tenha Pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Testando se um Pokemon é acrescentado aos favoritos', () => {
    renderWithRouter(<App />);
    const pokemonSelect = screen.getByText('More details');
    fireEvent.click(pokemonSelect);

    const favoritePokemonEvent = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoritePokemonEvent);

    const favoritePokemon = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemon);

    const pokemon = screen.getByText('More details');
    expect(pokemon).toBeInTheDocument();
  });
});
