import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokemon.js Tests', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = screen.getByText(/6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImg = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('O card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetails);

    const isFavorite = screen.getByRole('checkbox');
    userEvent.click(isFavorite);

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoriteLink);

    const favoritePokemon = screen.getAllByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoritePokemon[0]).toHaveAttribute('src', '/star-icon.svg');
  });
});
// Alteração para novo commit
