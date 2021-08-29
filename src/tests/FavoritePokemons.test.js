import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('FavoritePokemons.js tests', () => {
  test('case of no favorites', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  test('case of some favorites', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritePokemon);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });
});
