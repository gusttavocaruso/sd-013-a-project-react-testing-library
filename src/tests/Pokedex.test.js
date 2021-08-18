import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemons from '../data';

afterEach(cleanup);

const nameId = 'pokemon-name';

describe('Tests for Pokedex.js', () => {
  it('Check for h2 with text "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Check if "Próximo Pokémon" button is working as intended', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toBeInTheDocument();
    const names = Pokemons.map((p) => p.name);
    names.forEach((p, index) => {
      userEvent.click(nextBtn);
      const name = screen.getByTestId(nameId);
      if (index === names.length - 1) {
        expect(name.innerHTML).toBe(names[0]);
      } else {
        expect(name.innerHTML).toBe(names[index + 1]);
      }
    });
  });

  it('Check that only one pokemon is visible', () => {
    renderWithRouter(<App />);

    const card = screen.getAllByTestId(nameId);
    expect(card).toHaveLength(1);
  });

  it('Check that there is a button for each type of pokemon present', () => {
    renderWithRouter(<App />);

    const arr = [...new Set(Pokemons.reduce((types, { type }) => [...types, type], []))];

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    arr.forEach((t, index) => {
      expect(typeBtn[index].innerHTML === t).toBeTruthy();
    });
  });

  it('Check that only pokemons of a specific type are available when filtered', () => {
    renderWithRouter(<App />);

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

  // it('Check that there are elements with pokemon-type-button testid', () => {
  //   renderWithRouter(<App />);

  //   const typeBtn = screen.getAllByTestId('pokemon-type-button');
  //   typeBtn.forEach((btn) => { expect(btn).toBeInTheDocument(); });
  // });
});
