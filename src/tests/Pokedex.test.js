import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <App.js />', () => {
  const namepoke = 'pokemon-name';

  it('will test the title of page pokedex', () => {
    renderWithRouter(<App />);

    const titleNotFound = screen.getByText('Encountered pokémons');
    expect(titleNotFound).toBeInTheDocument();
  });

  it('will test if the list of pokemons is shown when click in the button"next"',
    () => {
      renderWithRouter(<App />);

      const firstPokemon = screen.getByTestId(namepoke).innerHTML;
      const buttonNextPokemon = screen.getByTestId('next-pokemon');
      expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');

      pokemons.forEach(() => userEvent.click(buttonNextPokemon));
      const pokemonAfterTurnAllPokemons = screen.getByTestId(namepoke).innerHTML;

      expect(firstPokemon).toBe(pokemonAfterTurnAllPokemons);
    });
  it('will test if just hava a only pokemon in the page', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(namepoke);
    expect(pokemon).toHaveLength(1);
  });

  it('will test if the page have all buttons', () => {
    renderWithRouter(<App />);

    const typesArray = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))].length;
    const allButtonType = screen.getAllByTestId('pokemon-type-button').length;

    expect(allButtonType).toBe(typesArray);

    const pokemonsType = pokemons.filter((pokemon) => pokemon.type === 'Fire')
      .map((pokemon) => pokemon.type);
    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(screen.getByText('Fire'));
    const response = pokemonsType.every((pokemon) => {
      userEvent.click(buttonNextPokemon);
      return screen.getByTestId('pokemon-type').innerHTML === pokemon;
    });

    expect(response).toBeTruthy();
  });

  it('will test if the page have all buttons', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();

    const firstPokemon = screen.getByTestId(namepoke).innerHTML;
    userEvent.click(screen.getByText('Fire'));
    userEvent.click(allButton);
    const buttonNextPokemon = screen.getByTestId('next-pokemon');
    pokemons.forEach(() => userEvent.click(buttonNextPokemon));
    const pokemonAfterTurnAllPokemons = screen.getByTestId(namepoke).innerHTML;

    expect(firstPokemon).toBe(pokemonAfterTurnAllPokemons);
  });
});
