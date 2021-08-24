import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { PokemonDetails } from '../components';
// import userEvent from '@testing-library/user-event';

describe('Test FavoritePokemons.js to verify if there are favorites pokemons', () => {
  test('if a message is displayed when no favorite pokemon is chosen', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFav = screen.getByText(/No favorite pokemon found/i);
    expect(noFav).toBeInTheDocument();
  });

  test('if favorite is displayed when favorite pokemon is chosen', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    fireEvent.click(moreDetails);
    const fav = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(fav);
    const favs = screen.getByText('Favorite Pokémons');
    fireEvent.click(favs);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
