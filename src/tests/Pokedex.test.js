import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const getH2 = (text) => screen.getByRole('heading', {
  name: text,
  level: 2,
});

const clickButton = (text) => fireEvent.click(screen.getByRole('button', { name: text }));

const getAllPokemonsOnScreen = () => screen.getAllByTestId('pokemon-name');

const clickNext = () => fireEvent.click(screen.getByTestId('next-pokemon'));

const POKEMON_TYPES = [
  ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
];

const getListNameOfPokemonsByType = (type) => pokemons
  .filter((pokemon) => pokemon.type === type)
  .map(({ name }) => name);

beforeEach(() => renderWithRouter(<App />));

describe('Test Pokedex.js', () => {
  it('should contain an h2 with `Encountered pokémons`', () => {
    const heading = getH2('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('should exibit the next Pokémon when clicking `Próximo pokémon`', () => {
    // Checks all pokemons in data.js
    pokemons.map(({ name }) => name).forEach((pokemon, idx) => {
      // Does not click `Próximo pokémon` in the first iteration
      if (idx !== 0) clickNext();

      const pokemonOnScreen = getAllPokemonsOnScreen()[0];
      expect(pokemonOnScreen.textContent).toBe(pokemon);
    });

    // After the last one, returns to the first pokemon
    clickNext();
    const pokemonOnScreen = getAllPokemonsOnScreen()[0];
    expect(pokemonOnScreen.textContent).toBe(pokemons[0].name);
  });

  it('should exibit one pokemon at a time', () => {
    expect(getAllPokemonsOnScreen().length).toBe(1);
    clickNext();
    expect(getAllPokemonsOnScreen().length).toBe(1);
  });

  it('should contain all buttons to filter Pokémons by its types', () => {
    const buttonsType = screen.getAllByTestId('pokemon-type-button');

    POKEMON_TYPES.forEach((type, idx) => {
      expect(POKEMON_TYPES[idx]).toBe(buttonsType[idx].textContent);
    });

    clickButton('All');
    expect(getH2('Encountered pokémons')).toBeInTheDocument();
  });

  it('should only exibit filtered Pokémons', () => {
    POKEMON_TYPES.forEach((type) => {
      clickButton(type);
      const filteredPokemons = getListNameOfPokemonsByType(type);
      filteredPokemons.forEach((pokemonName) => {
        expect(getAllPokemonsOnScreen()[0].textContent).toBe(pokemonName);
        clickNext();
      });
    });
  });

  it('should have a button to reset the filter', () => {
    clickNext();
    expect(getAllPokemonsOnScreen()[0].textContent).toBe('Charmander');

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeVisible();
  });
});
