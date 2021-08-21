import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the component FavoritePokemons', () => {
  it(`Test if it is showed in the screen the message No favorite pokemon found,
   if the user do not have favorite pokemons`, () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonsNotFound = screen.getByText('No favorite pokemon found');
    const existPokemons = screen.queryByTestId('pokemon-name');
    expect(pokemonsNotFound).toBeInTheDocument();
    expect(existPokemons).toBeNull();
  });
  it('Test if it is showed all of the favorite pokemons cards', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favPokemon = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(favPokemon);
    expect(favPokemon).toBeChecked();

    const { history: path } = renderWithRouter(<FavoritePokemons />);
    path.push('/favorites');

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
