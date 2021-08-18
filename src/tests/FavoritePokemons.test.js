import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing \'FavoritePokemons\' component', () => {
  it('should no have favorite pokemons', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noFavorite = screen.getByText(/no favorite pokemon/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('should have favorite pokemons', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favoriteButton = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteButton);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pokeSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeSprite).toBeInTheDocument();
  });
});
