import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Verifica o componente Favorite Pokemons', () => {
  it('Verifica se é exibido mensagem Not found, se não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const textNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsLink);

    const checkBox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado/i,
    });
    userEvent.click(checkBox);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoriteLink);

    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();
  });
});
