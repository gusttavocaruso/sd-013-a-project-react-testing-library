import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando Componente Pokedex:', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const pokemonName = 'pokemon-name';

  test('Testa se a página contem um H2 com o texto Encoutered pokémons', () => {
    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const nextButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    const id = screen.getByTestId(pokemonName);
    expect(id).toBeInTheDocument();

    pokemons.map((pokemon, i) => {
      expect(id).toHaveTextContent(pokemon.name);
      userEvent.click(nextButton);
      return expect(id).not.toHaveTextContent(pokemons[i].name);
    });
    pokemons.forEach((pokemon, i) => {
      if (i < pokemons.length - 1) userEvent.click(nextButton);
    });
    const lastPokemon = pokemons[pokemons.length - 1].name;
    expect(id).toHaveTextContent(lastPokemon);
    const firstPokemon = pokemons[0].name;
    userEvent.click(nextButton);
    expect(id).toHaveTextContent(firstPokemon);
  });

  test('Testa se é mostrado apenas um pokemon por vez.', () => {
    const onePokemon = screen.getAllByTestId(pokemonName);
    expect(onePokemon.length).toBe(1);
  });

  test('Testa se existem os botões de filtro na pokedex.', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(types.length);

    typeButton.map((button, i) => {
      expect(button).toBeInTheDocument();
      return expect(typeButton[i]).toHaveTextContent(types[i]);
    });
    const allPokemon = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allPokemon).toBeInTheDocument();
  });

  test('Testa se existe um botão para resetar o filtro.', () => {
    const nextPokemon = screen.getByTestId(pokemonName);
    const allPokemon = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allPokemon).toBeInTheDocument();
    userEvent.click(allPokemon);
    const buttonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    pokemons.forEach((pokemon, i) => {
      expect(nextPokemon).toHaveTextContent(pokemons[i].name);
      userEvent.click(buttonNext);
      expect(allPokemon).toBeInTheDocument();
    });
  });
});
