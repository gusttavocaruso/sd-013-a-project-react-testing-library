import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemons from '../data';

const nameId = 'pokemon-name';
afterEach(cleanup);

describe('pokedex.js` tests', () => {
  it('tests if there are a h2 with "Encountered pokémons" on it', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('test if the button "Próximo Pokémon" is working properly', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toBeInTheDocument();
    const pokemonList = Pokemons.map((pokemon) => pokemon.name);
    pokemonList.forEach((pokemon, index) => {
      userEvent.click(nextBtn);
      const pokemoName = screen.getByTestId(nameId);
      if (index === pokemonList.length - 1) {
        expect(pokemoName.innerHTML).toBe(pokemonList[0]);
      } else {
        expect(pokemoName.innerHTML).toBe(pokemonList[index + 1]);
      }
    });
  });
  it('Check that only one pokemon is visible', () => {
    renderWithRouter(<App />);
    const card = screen.getAllByTestId(nameId);
    expect(card).toHaveLength(1);
  });
  it('test if there are buttons of each type of pokemon', () => {
    renderWithRouter(<App />);
    const apt = [...new Set(Pokemons.reduce((types, { type }) => [...types, type], []))];
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    apt.forEach((type, index) => {
      expect(typeBtn[index].innerHTML === type).toBeTruthy();
    });
  });
  it('test if just pokemon of the type are available', () => {
    renderWithRouter(<App />);
    const apt = [...new Set(Pokemons.reduce((types, { type }) => [...types, type], []))];
    apt.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      const filteredPokemons = Pokemons.filter((poke) => poke.type === type);
      const nextButton = screen.getByTestId('next-pokemon');
      const names = filteredPokemons.map((pokemon) => pokemon.name);
      names.forEach((pokemon, index) => {
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
