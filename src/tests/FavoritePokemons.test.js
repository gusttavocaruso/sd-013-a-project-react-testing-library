import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />.', () => {
  test(
    'Exibi a mensagem No favorite pokemon found, não tiver pokémons favoritos.',
    () => {
      renderWithRouter(<FavoritePokemons />);
      screen.getByText(/No favorite pokemon found/i);
    },
  );

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetails);

    const checkBoxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkBoxFavorite);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });
});
