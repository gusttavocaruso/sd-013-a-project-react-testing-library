import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const pMsg = /no favorite pokemon found/i;
    const notFav = screen.getByText(pMsg);

    expect(notFav).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const pkmFavCheck = screen.getByText(/pokémon favorito?/i);
    userEvent.click(pkmFavCheck);

    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favLink);

    const poketestID = screen.getByTestId('pokemon-name');

    expect(poketestID).toBeInTheDocument();
  });
});
