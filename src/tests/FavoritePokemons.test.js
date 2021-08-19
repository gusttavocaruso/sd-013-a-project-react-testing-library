import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tests the FavoritePokemons component', () => {
  it('Checks if theres a display message about having no favorite Pokemon', () => {
    render(<FavoritePokemons />);
    // This p should be in the page
    const noFavTex = /no favorite pokemon found/i;
    const fetchedFavTex = screen.getByText(noFavTex);
    expect(fetchedFavTex).toBeInTheDocument();
  });
  it('Checks if favorites Pokemons are displayed', () => {
    renderWithRouter(<App />);
    // Goes to Pokémon detail page
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Adds Pokémon to Favorites
    const addToFav = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(addToFav);
    // Goes to Favorites page
    const favoritePokes = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    fireEvent.click(favoritePokes);
    // Fetches a Pokémon sprite
    const pokeSprite = screen.getByAltText(/sprite/i);
    expect(pokeSprite).toBeInTheDocument();
  });
});
