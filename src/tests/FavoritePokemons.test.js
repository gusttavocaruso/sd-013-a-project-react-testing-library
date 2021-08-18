import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testar o Favorite', () => {
  test('Teste se é exibido mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const msgFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(msgFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritos', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);

    const inputCheckBox = screen.getByRole('checkbox');
    userEvent.click(inputCheckBox);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoriteLink);

    const pokemonId = screen.getByTestId('pokemon-name');
    expect(pokemonId).toBeInTheDocument();
  });
});
