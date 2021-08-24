import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokedex.js', () => {
  test('Se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });
    expect(h2).toBeDefined();
  });

  test('Se é exibido o próximo Pokémon da lista quando clica o botão "Próximo pokémon"',
    () => {
      renderWithRouter(<App />);

      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      pokemons.forEach((pokemon) => {
        let pokemonName = pokemon.name;
        if (pokemonName === 'Dragonair') {
          const currentPokemon = screen.getByText(pokemonName);
          expect(currentPokemon).toBeInTheDocument();

          userEvent.click(buttonNext);
          pokemonName = 'Pikachu';
          const nextPokemon = screen.getByText(pokemonName);
          expect(nextPokemon).toBeInTheDocument();
        } else {
          const currentPokemon = screen.getByText(pokemonName);
          expect(currentPokemon).toBeInTheDocument();

          userEvent.click(buttonNext);
        }
      });
    });

  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemon).toHaveLength(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonAllTypes = screen.getByText(/All/i);
    expect(buttonAllTypes).toBeInTheDocument();

    const types = pokemons.reduce((acc, pokemon) => {
      if (!acc.includes(pokemon.type)) {
        acc.push(pokemon.type);
      }
      return acc;
    }, []);

    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsType.length).toBe(types.length);

    const buttonNext = screen.getByText(/Próximo pokémon/i);

    buttonsType.forEach((button, index) => {
      expect(button).toHaveTextContent(types[index]);
      userEvent.click(button);
      userEvent.click(buttonNext);
      const nextPokemon = screen.getByTestId('pokemon-type');
      expect(nextPokemon).toHaveTextContent(types[index]);

      expect(buttonAllTypes).toBeInTheDocument();
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAllTypes = screen.getByText(/All/i);
    expect(buttonAllTypes).toBeInTheDocument();

    userEvent.click(buttonAllTypes);

    const buttonNext = screen.getByText(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const currentPokemon = screen.getByTestId('pokemon-name');
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNext);
    });
  });
});
