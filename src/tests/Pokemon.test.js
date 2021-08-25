import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  const pokemon = pokemons[0];
  const weight = pokemon.averageWeight;

  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemon.type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${weight.value} ${weight.measurementUnit}`);

    const pokemonUrl = screen.getByRole('img');
    expect(pokemonUrl.src).toBe(pokemon.image);
    expect(pokemonUrl.alt).toBe(`${pokemon.name} sprite`);
  });

  test('Se o card do Pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeDefined();
    expect(moreDetails.href).toContain(`/pokemons/${pokemon.id}`);
  });

  test('Se ao clicar no link é feito o redirecionamento da aplicação',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
    });

  test('', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(favorite).toBeDefined();
    userEvent.click(favorite);

    const star = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
