import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3 - FavoritePokemons.js', () => {
  test('Verifica se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    localStorage.clear();
    render(<FavoritePokemons />);
    const strNotFound = screen.getByText(/no favorite pokemon found/i);
    expect(strNotFound).toBeInTheDocument();
  });

  test('Verifica se é exibido os cards favoritados', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkToDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);

    const ckboxFavoritPokemon = screen.getByRole('checkbox');
    userEvent.click(ckboxFavoritPokemon);

    const linkToFavorites = screen.getByRole('link', {
      name: /favorite pokémons/i,
      exact: false,
    });
    userEvent.click(linkToFavorites);

    const strNamePokemon = screen.getByText(/pikachu/i);
    expect(strNamePokemon).toBeInTheDocument();
  });
});
