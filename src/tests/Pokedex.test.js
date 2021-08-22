import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex.js tests', () => {
  test('A página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const textH2 = screen.getAllByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(textH2).toBeDefined();
  });

  test('É exibido o próximo Pokémon quanto o botão "Próximo pokémon" é clidado', () => {
    renderWithRouter(<App />);

    const pokemonList = pokemons.map(({ name }) => name);
    const btnPróximoPokémon = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });
    pokemonList.forEach((pokemonName) => {
      expect(screen.getByText(pokemonName)).toBeInTheDocument();
      userEvent.click(btnPróximoPokémon);
    });
  });

  test('É mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonCard = screen.getAllByText(/More details/i);

    expect(pokemonCard).toHaveLength(1);
  });

  test('A Pokédex têm os botôes de filtro', () => {
    renderWithRouter(<App />);

    const pokemonTypes = pokemons.map(({ type }) => type);
    const btnPokemonType = screen.getAllByTestId('pokemon-type-button');

    pokemonTypes.forEach((currentType) => {
      const pokemonTypebtn = screen.getByRole('button', { name: currentType });
      expect(pokemonTypebtn).toBeInTheDocument();
    });

    btnPokemonType.forEach((currentButton) => {
      expect(currentButton).toBeInTheDocument();
    });
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });

    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
