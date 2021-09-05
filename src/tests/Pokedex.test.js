import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex.js Tests', () => {
  test('test if the page contains a heading h2 with the text Page requested...', () => {
    // Acess screen elements
    renderWithRouter(<App />);

    const titleH2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(titleH2).toBeInTheDocument();
  });

  test('test if the nxt Pok in the list is displayed when the nxt btn is clicked', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const getName = screen.getByTestId('pokemon-name');
      expect(getName).toHaveTextContent(pokemon.name);
      // event click
      userEvent.click(btnNext);
    });
  });

  test('test if one pokemon is displayed at a time', () => {
    renderWithRouter(<App />);

    const getName = screen.getAllByTestId('pokemon-name');
    expect(getName.length).toBe(1);
  });

  test('test if there are filter buttons', () => {
    renderWithRouter(<App />);

    const allbtns = 7;
    const btns = screen.getAllByTestId('pokemon-type-button');
    btns.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
    expect(btns).toHaveLength(allbtns);
  });

  test('test if only pokemons of the chosen type appear', () => {
    renderWithRouter(<App />);

    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    const btnFilterBug = btnFilter.find((btn) => btn.innerHTML === 'Bug');

    userEvent.click(btnFilterBug);
    const textType = screen.getByTestId('pokemon-type').innerHTML;
    expect(textType).toBe('Bug');
  });

  test('test if there is the all button', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);

    const pok1 = screen.getByText('Pikachu');
    expect(pok1).toBeInTheDocument();
  });

  test('tests if there is a button that resets the filter', () => {
    renderWithRouter(<App />);

    const btnReset = screen.getByRole('button', { name: 'All' });
    const pok1 = screen.getByText('Pikachu');

    userEvent.click(btnReset);
    expect(pok1).toBeInTheDocument();
  });
});
