import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing component Pokedex:', () => {
  const pokename = 'pokemon-name';
  beforeEach(() => { renderWithRouter(<App />); });
  test('Teste se a pagina contém um heading h2 com o texto Encountered pokémons', () => {
    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeDefined();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const pokeButtonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(pokeButtonNext).toBeInTheDocument();

    const pokeId = screen.getByTestId(pokename);

    expect(pokeId).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      expect(pokeId).toHaveTextContent(pokemon.name);
      userEvent.click(pokeButtonNext);
      return expect(pokeId).not.toHaveTextContent(pokemons[index].name);
    });

    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(pokeButtonNext);
    });

    const lastPoke = pokemons[pokemons.length - 1].name; // Sempre que o tamanho do array for alterado vai pegar a ultima posião;
    expect(pokeId).toHaveTextContent(lastPoke);

    const firstPoke = pokemons[0].name;

    userEvent.click(pokeButtonNext);

    expect(pokeId).toHaveTextContent(firstPoke);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const oneAtATime = screen.getAllByTestId(pokename);

    expect(oneAtATime.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(types.length);
    typeButton.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(typeButton[index]).toHaveTextContent(types[index]);
    });

    const pokeButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(pokeButtonAll).toBeInTheDocument();
  });

  test('Testa se exite um botão para resetar o filtro.', () => {
    const nextPokemon = screen.getByTestId('pokemon-name');
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
