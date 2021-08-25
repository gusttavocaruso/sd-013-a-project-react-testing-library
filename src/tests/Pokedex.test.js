import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

const pokemonName = 'pokemon-name';

describe('Tests component "Pokedex"', () => {
  test('if page contains h2 with specific text', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('if next pokémon is shown when button is clicked', () => {
    renderWithRouter(<App />);
    const pokemons = data.map((pokemon) => pokemon.name);
    const nextButton = screen.getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const poke = screen.getByTestId(pokemonName).innerHTML;
      expect(poke).toEqual(pokemon);
      fireEvent.click(nextButton);
    });
  });

  test('if 1st pokémon is shown when button is clicked while showing the last', () => {
    renderWithRouter(<App />);
    const pokemons = data.map((pokemon) => pokemon.name);
    const nextButton = screen.getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      if (pokemon === pokemons[pokemons.length - 1]) {
        const poke = screen.getByTestId(pokemonName).innerHTML;
        expect(poke).toEqual(pokemons[0]);
        fireEvent.click(nextButton);
      }
    });
  });

  test('if just one pokemon is shown per time', () => {
    renderWithRouter(<App />);
    const paragraph = screen.getAllByTestId(pokemonName);
    expect(paragraph.length).toBe(1);
  });

  test('if Pokedex has filter buttons and if it works properly', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByText('Próximo pokémon');
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = data.reduce((acc, cV) => {
      if (!acc.includes(cV.type)) {
        acc.push(cV.type);
      }
      return acc;
    }, []);
    pokemonTypes.forEach((pokemon, index) => {
      expect(buttonTypes[index]).toHaveTextContent(pokemon);
      userEvent.click(buttonTypes[index]);
      userEvent.click(nextButton);
      const type = screen.getByTestId('pokemon-type');
      expect(type).toHaveTextContent(pokemon);
    });
  });

  test('if Pokedex has reset filter button called "All"', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('All');
    userEvent.click(button);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextButton = screen.getByText('Próximo pokémon');
    userEvent.click(nextButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
});
