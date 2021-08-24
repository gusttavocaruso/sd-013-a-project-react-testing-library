import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tests for the FavoritePokemons component', () => {
  it('Checks if theres a display message with the text "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    // Finds the "P" element with the desired text, by using the RegExp method (/string/i), and provides this information to a new const through a screen.getByText method to better organize the structure of the code.
    const noFavTex = /no favorite pokemon found/i;
    const fetchedFavTex = screen.getByText(noFavTex);
    // It expects the "P" element, with the corresponding text fetched by the RegEx method, to be in the document.
    expect(fetchedFavTex).toBeInTheDocument();
  });
  it('Checks if favorites Pokemons are displayed', () => {
    renderWithRouter(<App />);
    // Catches the More Details link.
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    // Simulates a click event on the More Details link by using the "fireEvent.click" method and informing it the const that we just declared above.
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
