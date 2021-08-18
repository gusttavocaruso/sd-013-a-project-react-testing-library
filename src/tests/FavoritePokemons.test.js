import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <FavoritePokemons />', () => {
  it('Verifica se o texto "No favorite pokemon found" aparece na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const favoriteLink = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Verifica se os cards dos pokémons favoritados são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    const detailButton = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailButton);
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    userEvent.click(favoriteCheckbox);
    history.push('/favorites');
    const favoritePokemon = screen.getByTestId('pokemon-name');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
