import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Testa os testes do favorites.', () => {
  test('Verifica se existe uma URL favorites.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const headingFavorites = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(headingFavorites).toBeInTheDocument();
  });
  test('Verifica se não existe nenhum pokemon favoritado', () => {
    render(<FavoritePokemons />);

    const getFavorites = screen.getByText(/no favorite/i);
    expect(getFavorites).toBeInTheDocument();
  });
});

describe('Testa a favoritação.', () => {
  test('Verifica se os pokemons favoritados são renderizados', () => {
    renderWithRouter(<App />);
    const getMoreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(getMoreDetails);
    const getFavorited = screen.getByText(/pokémon favorito?/i);
    fireEvent.click(getFavorited);
    const favoritesButton = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favoritesButton);
    const getPokemonIDs = screen.getByTestId('pokemon-name');
    const getPokemonIDs2 = screen.getByTestId('pokemon-type');
    const getPokemonIDs3 = screen.getByTestId('pokemon-weight');

    expect(getPokemonIDs).toBeInTheDocument();
    expect(getPokemonIDs2).toBeInTheDocument();
    expect(getPokemonIDs3).toBeInTheDocument();
  });
});
