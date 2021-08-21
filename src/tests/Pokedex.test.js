import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './rederWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Component Pokedex:', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(pokedexText).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const pokeButtonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(pokeButtonNext).toBeInTheDocument();

    const pokeId = screen.getByTestId('pokemon-name');

    expect(pokeId).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      expect(pokeId).toHaveTextContent(pokemon.name);
      userEvent.click(pokeButtonNext);
      return expect(pokeId).not.toHaveTextContent(pokemons[index].name);
    });

    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(pokeButtonNext);
    });

    const lastPoke = pokemons[8].name;

    expect(pokeId).toHaveTextContent(lastPoke);

    const firstPoke = pokemons[0].name;
    userEvent.click(pokeButtonNext);

    expect(pokeId).toHaveTextContent(firstPoke);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokeNext = screen.getAllByTestId('pokemon-name');

    expect(pokeNext.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.

    const typeButton = screen.getAllByTestId('pokemon-type-button');

    expect(typeButton.length).toBe(types.length);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

    typeButton.map((button, index) => {
      expect(button).toBeInTheDocument();
      return expect(typeButton[index]).toHaveTextContent(types[index]);
    });

    // O botão All precisa estar sempre visível.

    const pokeButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(pokeButtonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const theNextPoke = screen.getByTestId('pokemon-name');

    // O texto do botão deve ser All;

    const pokeButtonAll = screen.getByRole('button', {
      name: /All/i,
    });
    expect(pokeButtonAll).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

    userEvent.click(pokeButtonAll);
    const pokeButtonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    pokemons.forEach((pokemon, index) => {
      expect(theNextPoke).toHaveTextContent(pokemons[index].name);
      userEvent.click(pokeButtonNext);
      expect(pokeButtonAll).toBeInTheDocument();
    });
  });
});
