import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente Pokedex', () => {
  const namepokemon = 'pokemon-name';
  const nextpokemon = 'next-pokemon';
  it('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const msgEncounteredPokes = screen.getByText('Encountered pokémons');
    expect(msgEncounteredPokes).toBeInTheDocument();
  });
  it('Teste é exibido o próx Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(<App />);
      const firstPokemon = screen.getByTestId(namepokemon).innerHTML;
      const buttonNextPokemon = screen.getByTestId(nextpokemon);
      expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
      pokemons.forEach(() => userEvent.click(buttonNextPokemon));
      const pokemonAfterTurnAllPokemons = screen.getByTestId(namepokemon).innerHTML;
      expect(firstPokemon).toBe(pokemonAfterTurnAllPokemons);
    });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(namepokemon);
    expect(pokemon).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typesArray = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))].length;
    const allButtonType = screen.getAllByTestId('pokemon-type-button').length;
    expect(allButtonType).toBe(typesArray);
    const pokemonsType = pokemons.filter((pokemon) => pokemon.type === 'Fire')
      .map((pokemon) => pokemon.type);
    const buttonNextPokemon = screen.getByTestId(nextpokemon);
    userEvent.click(screen.getByText('Fire'));
    const response = pokemonsType.every((pokemon) => {
      userEvent.click(buttonNextPokemon);
      return screen.getByTestId('pokemon-type').innerHTML === pokemon;
    });
    expect(response).toBeTruthy();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getByText('All');
    expect(allButtons).toBeInTheDocument();
    const firstPokemon = screen.getByTestId(namepokemon).innerHTML;
    userEvent.click(screen.getByText('Fire'));
    userEvent.click(allButtons);
    const buttonNextPokemon = screen.getByTestId(nextpokemon);
    pokemons.forEach(() => userEvent.click(buttonNextPokemon));
    const pokemonAfterTurnAllPokemons = screen.getByTestId(namepokemon).innerHTML;
    expect(firstPokemon).toBe(pokemonAfterTurnAllPokemons);
  });
});
