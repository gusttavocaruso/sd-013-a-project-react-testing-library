import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Tests component "Pokemon"', () => {
  test('if a card with information is renderized', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    const pokemonNames = data.map((pokemon) => pokemon.name);
    expect(pokemonName).toHaveTextContent(pokemonNames[0]);

    const pokemonTypes = data.map((pokemon) => pokemon.type);
    expect(pokemonType).toHaveTextContent(pokemonTypes[0]);

    const pokemonWeights = data
      .map((
        pokemon,
      ) => `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${pokemonWeights[0]}`);

    const pokemonImg = screen.getByAltText(/ *sprite/i);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('if pokemon card contains a link to the right route', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if there is a star icon on favorite pokemons', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    const check = screen.getByLabelText('Pokémon favoritado?');

    fireEvent.click(check);

    expect(check.checked).toBeTruthy();
    const icon = screen.getByAltText(/ *is marked as favorite/i);
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
