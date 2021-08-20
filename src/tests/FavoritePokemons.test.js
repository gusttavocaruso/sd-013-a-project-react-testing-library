import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se a mensagem "No favorite pokemon found" é exibida', () => {
  test('Testa a mensagem', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    expect(history.location.pathname).toEqual('/favorites');

    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se os pokemons são exibidos', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toEqual('/pokemons/25');

    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    const pikachuFav = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachuFav).toBeInTheDocument();

    const pokemonFavs = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokemonFavs);
    expect(history.location.pathname).toEqual('/favorites');

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
