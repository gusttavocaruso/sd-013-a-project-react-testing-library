import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemons from '../data';

afterEach(cleanup);

const nameId = 'pokemon-name';

describe('Teste o componente Pokedex.js', () => {
  it('Teste se página contém um heading h2 "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se é exibido o botao "Próximo Pokémon"', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    const nextPokemon = screen.getByTestId('next-pokemon');
    const names = Pokemons.map((p) => p.name);
    names.forEach((p, index) => {
      userEvent.click(nextPokemon);
      const name = screen.getByTestId(nameId);
      if (index === names.length - 1) {
        expect(name.innerHTML).toBe(names[0]);
      } else {
        expect(name.innerHTML).toBe(names[index + 1]);
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const card = screen.getAllByTestId(nameId);
    expect(card).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const arr = [...new Set(Pokemons.reduce((types, { type }) => [...types, type], []))];

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    // baseado no codigo do aluno Gabriel Gaspar
    arr.forEach((t) => {
      const typeBtn = screen.getByRole('button', { name: t });
      expect(typeBtn).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    // baseado no codigo do aluno Gabriel Gaspar
    const arr = [...new Set(Pokemons.reduce((types, { type }) => [...types, type], []))];
    arr.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      const filteredPokemons = Pokemons.filter((p) => p.type === type);
      const nextButton = screen.getByTestId('next-pokemon');
      const names = filteredPokemons.map((p) => p.name);
      names.forEach((p, index) => {
        userEvent.click(nextButton);
        const name = screen.getByTestId(nameId);
        if (index === names.length - 1) {
          expect(name.innerHTML).toBe(names[0]);
        } else {
          expect(name.innerHTML).toBe(names[index + 1]);
        }
      });
    });
  });
});
