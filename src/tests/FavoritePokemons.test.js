import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWhithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 3', () => {
  test('É exibido na tela a mensagem "No favorite pokemon found"?', () => {
    renderWhithRouter(<FavoritePokemons />);

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  test('É exibido todos os cards de pokémons favoritados.', () => {
    renderWhithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);

    const textFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(textFavorite);

    const favoritePokemon = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(favoritePokemon);

    const card = screen.getByTestId('pokemon-name');
    expect(card).toBeInTheDocument();
  });
});
