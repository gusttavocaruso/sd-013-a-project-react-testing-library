import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente FavoritePokemons', () => {
  test('Verifica mensagem exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const msgNotFavorite = screen.getByText('No favorite pokemon found');
    expect(msgNotFavorite).toBeInTheDocument();
  });

  test('Verifica se renderiza os Pokemons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: 'More details' });
    userEvent.click(moreDetails);

    const pokemonFavorite = screen.getByRole('checkbox');
    userEvent.click(pokemonFavorite);

    const pageFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons' });
    userEvent.click(pageFavorite);

    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
  });
});

// Apos finalizar os testes percebi que poderia ter encapsulado tudo dentro do userEvent, porem apos concluir pelo menos os 80%, tentarei refatorar. (Claro se passar no avaliador).
