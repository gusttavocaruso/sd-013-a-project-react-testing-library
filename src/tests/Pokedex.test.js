import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokedex from '../data';

describe('Pokedex.js tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });
  test('Verifica existe um "Encountered pokémons"', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const homeText = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(homeText).toBeInTheDocument();
  });
  test('Verifica se é exibido o próximo pokémon da lista', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });
  test('Verifica se volta para o primeiro pokemon', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    // Peguei essa com o Matheus Duarte
    const pokemonAmount = pokedex.length;
    for (let start = 0; start < pokemonAmount; start += 1) {
      userEvent.click(nextPokemon);
      const pokemons = screen.getAllByTestId('pokemon-name');
      expect(pokemons.length).toBe(1);
    }
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
  test('Verifica botões de filtro dos pokémons', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const filterType = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const typesOfPokemon = screen.getAllByTestId('pokemon-type-button');
    const list = typesOfPokemon.map((type) => type.innerHTML);
    expect(list).toEqual(filterType);
  });
  test('Verifica se ao clicar em um tipo e depois em próximo,'
    + 'é exibido apenas o próximo do mesmo tipo', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const psychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    const next = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(home);
    userEvent.click(psychic);
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    userEvent.click(next);
    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
  });
  test('Verifica se o botão all está sempre visivel', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const all = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(home);
    expect(all).toBeInTheDocument();
  });
  test('Verifica se o botão all reseta o filtro', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const psychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(psychic);
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    const all = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(all);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  test('Verifica se ao carregar a página o filtro seleciona é all', () => {
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    const psychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(home);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    userEvent.click(psychic);
    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();
    userEvent.click(about);
    userEvent.click(home);
    const pikachu2 = screen.getByText('Pikachu');
    expect(pikachu2).toBeInTheDocument();
  });
});
