import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests Pokedex componente', () => {
  it('Looks for a particular h2', () => {
    renderWithRouter(<App />);
    // this h2 should be in the page
    const messageDisplays = /encountered pokémons/i;
    const headingElement = screen.getByRole('heading', {
      name: messageDisplays,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
  });
  it('Tests the next Pokémon button functionality', () => {
    renderWithRouter(<App />);
    // Fetches the current Pokémon
    const firstPoke = screen.getByTestId(/pokemon-name/i);
    const firstPokeName = firstPoke.textContent;
    expect(firstPoke).toBeInTheDocument();
    // Fetches next Pokémon button and then clicks on it
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    // Fetches next Pokémon
    const secondPoke = screen.getByTestId(/pokemon-name/i);
    const secondPokeName = secondPoke.textContent;
    expect(secondPoke).toBeInTheDocument();
    // Compares first Pokémon to the second one
    expect(firstPokeName !== secondPokeName).toBeTruthy();
  });
  it('Tests if the page shows a single Pokémon', () => {
    renderWithRouter(<App />);
    // Fetches every Pokémon in the page
    const everyPoke = screen.getAllByTestId(/pokemon-name/i);
    expect(everyPoke).toHaveLength(1);
  });
  it('Checks for every type filter button', () => {
    renderWithRouter(<App />);
    // Fetches every Pokémon type the same way it's done in Pokedex.js
    const everyType = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    // Fetches every filter button
    const everyFilterButton = screen.getAllByTestId(/pokemon-type-button/i);
    everyFilterButton.forEach((filterButton, index) => {
      expect(filterButton).toBeInTheDocument();
      // Clicks on type filter button
      fireEvent.click(filterButton);
      // Fetches current Pokémon type displayed
      const currentType = screen.getByTestId('pokemon-type');
      // Checks if every Pokémon type has got its own filter
      // Checks if filter type clicked matches Pokémon type displayed
      expect(filterButton.innerHTML === everyType[index]
        && filterButton.innerHTML === currentType.textContent)
        .toBeTruthy();
    });
    // Fetches 'all Pokémons' button
    const allButton = screen.getByRole('button', {
      name: /all/i });
    expect(allButton).toBeInTheDocument();
  });
  it('Checks for all button and tests its functionality', () => {
    renderWithRouter(<App />);
    // Fetches 'all Pokémons' button
    const allButton = screen.getByRole('button', {
      name: /all/i });
    expect(allButton).toBeInTheDocument();
    // Fetches first Pokémon in data
    const firstPokeType = pokemons[0].type;
    // Clicks on All Button
    fireEvent.click(allButton);
    // Checks if Pokémon displayed matches first Pokémon on data
    const currentType = screen.getByTestId('pokemon-type');
    expect(firstPokeType === currentType.textContent);
  });
});