import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import isFavoriteById from './helpers/mockIsFavoriteByID';

describe('Testando Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteById }
      />,
    );
  });
  test('se a página contém um "h2" com o texto "Encountered pokémons"', () => {
    const h2Element = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(h2Element).toBeInTheDocument();
  });
  test('se é exibido o próximo pokémon ao clicar no botão Próximo pokemón', () => {
    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(botao.textContent).toBe('Próximo pokémon');

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeDefined();

    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(botao);
    });
    const lastPokemonAfterAll = screen.getByText('Pikachu');
    expect(lastPokemonAfterAll).toBeDefined();

    userEvent.click(botao);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeDefined();
  });
  test('se a pokédex tem os botões de filtro', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const screenButtons = [buttonAll, ...typeButtons];
    expect(screenButtons).toBeDefined();

    const types = new Set(pokemons.map(({ type }) => type));
    const allTypes = ['All', ...types];
    expect(allTypes.length).toStrictEqual(screenButtons.length);
  });
  test('se a pokédex tem os botões de filtro', () => {
    const screenButtons = screen.getAllByTestId('pokemon-type-button');
    const types = new Set(pokemons.map(({ type }) => type));
    const pokemonsType = [...types];

    screenButtons.forEach((button, index) => {
      expect(button.textContent).toStrictEqual(pokemonsType[index]);

      userEvent.click(button);

      const filteredPokemons = pokemons.filter(({ type }) => (
        type === button.textContent));
      filteredPokemons.forEach((poke) => {
        expect(poke.type).toBe(button.textContent);
        const buttonAll = screen.getByRole('button', { name: 'All' });
        expect(buttonAll).toBeDefined();
      });
    });
  });
  test('se a pokédex contém um botão para resetar o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeDefined();
    userEvent.click(buttonAll);
    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon.textContent).toBe('Pikachu');
  });
});
