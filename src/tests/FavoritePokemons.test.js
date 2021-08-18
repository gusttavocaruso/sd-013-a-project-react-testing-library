import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente "FavoritePokemons"', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found,', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFoundFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFoundFavorite).toBeInTheDocument();
  });

  test('Testa se todos os cards são renderizados', () => {
    renderWithRouter(<App />);
    const favoriteDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(favoriteDetails);

    const checkFavorite = screen.getByRole('checkbox');
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(checkFavorite);
    userEvent.click(favoritePokemon);

    const cardText = screen.getByText(/electric/i);
    expect(cardText).toBeInTheDocument();
  });
});
