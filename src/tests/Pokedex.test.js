import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Test "Pokedex" component', () => {
  it('Renders text "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokes = screen.getByRole('heading', { level: 2 });
    expect(encounteredPokes).toHaveTextContent('Encountered pokémons');
  });

  it('Renders next pokemon when "Próximo pokémon" is clicked', () => {
    renderWithRouter(<App />);

    const allPokesFilter = screen.getByText(/all/i);
    userEvent.click(allPokesFilter);

    const pokeName = screen.getByTestId('pokemon-name');
    const nextPokeBtn = screen.getByText(/Próximo pokémon/i);

    pokemons.forEach(({ name }) => {
      expect(pokeName).toHaveTextContent(name);
      userEvent.click(nextPokeBtn);
    });

    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Renders filtered pokémons when any filter button is clicked', () => {
    renderWithRouter(<App />);

    const typesSet = new Set();
    pokemons.forEach(({ type }) => typesSet.add(type));
    const types = [...typesSet];
    const btnAll = screen.getByText('All');

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((typeBtn, i) => {
      expect(btnAll).toBeInTheDocument();
      expect(typeBtn).toHaveTextContent(types[i]);
    });
  });

  // it('')
});
