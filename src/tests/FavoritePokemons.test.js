import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente "FavoritePokemons"', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFavorites = screen.getByText(/no favorite pokemon found/i);

    expect(notFoundFavorites).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards dos pokemons favoritos', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkMoreDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    const favoritePokemonLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(checkboxFavorite);
    userEvent.click(favoritePokemonLink);

    const cardText = screen.getByText(/electric/i);

    expect(cardText).toBeInTheDocument();
  });
});
