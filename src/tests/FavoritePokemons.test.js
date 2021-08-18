import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('test favorite pokemons feature', () => {
  it('should not have any favorite pokemon', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  it('should have a favorite pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoriteInput = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteInput);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pokemonSprite = screen.getAllByRole('img');
    expect(pokemonSprite[0]).toBeInTheDocument();
  });
});
