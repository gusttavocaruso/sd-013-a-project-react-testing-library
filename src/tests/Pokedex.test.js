import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRoute from './renderWithRoute';
import App from '../App';

describe('Testa o componente pokedex', () => {
  const namepokemon = 'pokemon-name';
  const nextpokemon = 'next-pokemon';

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRoute(<App />);
    const encountPokemons = screen.getByText('Encountered pokémons');
    expect(encountPokemons).toBeInTheDocument();
  });

  test('Teste próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRoute(<App />);
    const firstPoke = screen.getByTestId(namepokemon).innerHTML;
    const nextButton = screen.getByTestId(nextpokemon);
    expect(nextButton).toHaveTextContent('Próximo pokémon');

    pokemons.forEach(() => userEvent.click(nextButton));
    const allPokemons = screen.getByTestId(namepokemon).innerHTML;
    expect(firstPoke).toBe(allPokemons);
  });

  // test('', () => {
  //   renderWithRoute(<App />);
  //   const nextPoke = screen.getByText(nextPokemon);
  //   expect(nextPoke).toBeInTheDocument();
  // });

  test('Testa se é mostrado um pokemon por vez', () => {
    renderWithRoute(<App />);
    const pokemon = screen.getAllByTestId(namepokemon);
    expect(pokemon).toHaveLength(1);
  });

  test('Testa se tem botões de filtro', () => {
    renderWithRoute(<App />);
    const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(pokeTypes.length);
    // retorna todos os buttons
    buttons.map((btn, i) => {
      expect(btn).toBeInTheDocument();
      return expect(buttons[i]).toHaveTextContent(pokeTypes[i]);
    });
    const todosPoke = screen.getByRole('button', {
      name: /All/i,
    });
    expect(todosPoke).toBeInTheDocument();
  });

  test('Testa se tem um botão para resetar o filtro', () => {
    renderWithRoute(<App />);
    const pokemonName = screen.getByTestId(namepokemon);
    const allPokes = screen.getByRole('button', {
      name: /All/i,
    });
    expect(allPokes).toBeInTheDocument();
    userEvent.click(allPokes);

    const nextBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    pokemons.forEach((poke, i) => {
      expect(pokemonName).toHaveTextContent(pokemons[i].name);
      userEvent.click(nextBtn);
      expect(allPokes).toBeInTheDocument();
    });
  });
});
