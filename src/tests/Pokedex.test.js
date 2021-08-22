import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

function itaratePokemons() {
  // Achar o botão Próximo Pokemon
  const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(nextBtn).toBeInTheDocument();

  // Achar o nome do Pokemon rederizado pelo data-testid
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  pokemons.map((pokemon, index) => {
    const MAX_LENGTH = pokemons.length - 1;
    if (index === MAX_LENGTH) {
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
      return expect(pokemonName).toHaveTextContent(pokemons[0].name);
    }
    expect(pokemonName).toHaveTextContent(pokemon.name);
    userEvent.click(nextBtn);
    return expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
  });
}

describe('Testa a Página Pokedex', () => {
  test('Contém h2 dizendo que a pagina não é encontrada', () => {
    renderWithRouter(<App />);

    const h2Pokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(h2Pokedex).toBeInTheDocument();
  });

  test('Clique de botão funcionando corretamente', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
  });

  test('Testa se a lista mostra o próximo pokemon ao clicar em "Proximo Pokemon"', () => {
    renderWithRouter(<App />);
    itaratePokemons();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(1);
  });

  test('Teste de botões de filtro', () => {
    renderWithRouter(<App />);
    const types = pokemons.reduce((acc, curr) => {
      if (!acc.includes(curr.type)) {
        acc.push(curr.type);
      }
      return acc;
    }, []);
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtn.length).toBe(types.length);

    types.forEach((type) => {
      const btn = screen.getByRole('button', { name: type });
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);
      const allBtn = screen.getByRole('button', { name: /All/i });
      expect(allBtn).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);

    itaratePokemons();
  });
});

// src ajuda do pull request da julia baptista: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/64/files
