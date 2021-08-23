import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('FavoritePokemons.js tests', () => {
  test('Testando caso não encontre nenhum favorito', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(favorite);

    const favoriteText = screen.getByText('No favorite pokemon found');

    expect(favoriteText).toBeInTheDocument();
  });
  test('Teste se um pokémon é favoritado', () => {
    renderWithRouter(<App />);

    const eletric = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(eletric);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const fav = screen.getByText(/pokémon favoritado/i);
    userEvent.click(fav);

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(favorite);

    const favoritePokemon = screen.getByText(/pikachu/i);

    expect(favoritePokemon).toBeInTheDocument();
  });
});
