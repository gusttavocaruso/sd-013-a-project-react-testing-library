import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando FavoritePokemons.js', () => {
  test('Teste se é exibido na tela o texto "No favorite pokémon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('Teste se os pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);

    const searchPokemon = screen.getByText('Pikachu');
    expect(searchPokemon).toBeInTheDocument();
  });
});


