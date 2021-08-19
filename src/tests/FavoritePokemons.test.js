import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente FavoritePokemons.js', () => {
  it('Verifica se é exibida na tela a mensagem "No favorite pokemon found"'
  + ', se não tiver pokemons favoritos', () => {
    renderWithRouter(<App />);

    const linkFavPokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(linkFavPokemon);

    const notFoundParagraph = screen.getByText(
      /no favorite pokemon found/i,
    );

    expect(notFoundParagraph).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<App />);

    const linkFavPokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkMoreDetails);
    const checkBoxFavPokemon = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(checkBoxFavPokemon);
    userEvent.click(linkFavPokemon);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
