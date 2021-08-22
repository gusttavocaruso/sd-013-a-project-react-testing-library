import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste da aplicação de links', () => {
  test('Se na página favorites pokemons consta No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const notFoundFavoritesPokemons = screen.getByText('No favorite pokemon found');

    expect(notFoundFavoritesPokemons).toBeInTheDocument();
  });

  test('existe link de moreDetails na tela do app', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
  });

  test(`apos clicar no favoritar pokemon do pikachu ele vai para
  aba de favoritos`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);

    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
