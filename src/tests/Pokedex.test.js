import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Req 5', () => {
  test('A página contém um heading h2', () => {
    renderWithRouter(<App />);

    const header = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(header).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonAll); // resetar a aplicação

    const btnNext = screen.getByRole('link', {
      name: 'Próximo pokémon',
    });

    expect(btnNext).toContain('Próximo pokémon');

    const arrayDePokemons = pokemons.map((pokemon) => pokemon.name);// pego a lista de pokemons fazendo um map e selecionando cada pokemons pelo nome

    arrayDePokemons.forEach((pokemon, index) => {
      userEvent.click(btnNext);
      const name = screen.getByTestId(/pokemon-name/);

      if (index === arrayDePokemons.length - 1) {
        expect(name.innerHTML).toBe(arrayDePokemons[0]);
      } else {
        expect(name.innerHTML).toBe(arrayDePokemons[index + 1]);
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
    // https://jestjs.io/pt-BR/docs/expect#tohavelengthnumber
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    // O Jean Vitor Pacheco me deu uma luz de como fazer a função.
    const t = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]; // Function que retorna Todos os buttons no arquivo pokedex.js.

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(btnAll).toBeInTheDocument();

    t.forEach((button) => {
      const btnType = screen.getByRole('button', {
        name: button,
      }); // Faço um ForEach na lista de buttons e verifico se existe no documento
      expect(btnType).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const c = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    const name = screen.getAllByTestId(/pokemon-type-button/i);
    expect(name).toHaveLength(c.length);

    // feito com a ajuda do Thiago Carboneri
  });
});
