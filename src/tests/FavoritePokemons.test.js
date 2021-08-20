import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import renderWithRouter from '../components/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testing favoritePokemons component', () => {
  test('check if component renders a msg if no pokemon has been favorited', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ [] } />
      </BrowserRouter>,
    );

    const msg = screen.getByText(/no favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });
  test('check if component renders all  pokemons that have been favorited', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const pokemons = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(pokemons);

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    fireEvent.click(checkbox);

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favoritePokemons);

    const pokemon = screen.getByTestId(/pokemon-name/i);
    expect(pokemon).toBeInTheDocument();
  });
});
