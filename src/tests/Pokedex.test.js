import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for the Pokedex.js componente', () => {
  it('Checks if the page has a "H2" element with particular text', () => {
    renderWithRouter(<App />);
    // Finds the "H2" element with the desired text, by using the RegExp method (/string/i), and providing this information to a new const through a screen.getByRole method and informing that we need a 'heading' with the propretys name and level as such.
    const messageDisplays = /encountered pokémons/i;
    const headingElement = screen.getByRole('heading', {
      name: messageDisplays,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
  });
  it('Tests if the "Next Pokémon" button works', () => {
    renderWithRouter(<App />);
    // Fetches the current Pokémon by using RegExp and textContent methods.
    const firstPoke = screen.getByTestId(/pokemon-name/i);
    const firstPokeName = firstPoke.textContent;
    expect(firstPoke).toBeInTheDocument();
    // Fetches the "Next Pokémon" button and then clicks on it by using the fireEvent.click method.
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    // Fetches the next Pokémon by using the same methods as before.
    const secondPoke = screen.getByTestId(/pokemon-name/i);
    const secondPokeName = secondPoke.textContent;
    expect(secondPoke).toBeInTheDocument();
    // Finally, it compares the first Pokémon with the second one and expects it to be true.
    expect(firstPokeName !== secondPokeName).toBeTruthy();
  });
  it('Tests if the page shows a single Pokémon', () => {
    renderWithRouter(<App />);
    // Fetches every Pokémon in the page by using the getAllByTestId method, combined with RegExp and expects it to show only one pokemon.
    const everyPoke = screen.getAllByTestId(/pokemon-name/i);
    expect(everyPoke).toHaveLength(1);
  });
  it('Checks if the Pokédex has all of the filter buttons', () => {
    renderWithRouter(<App />);
    // Fetches every Pokémon type the same way it's done in Pokedex.js.
    const everyType = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    // Fetches every filter button.
    const everyFilterButton = screen.getAllByTestId(/pokemon-type-button/i);
    everyFilterButton.forEach((filterButton, index) => {
      expect(filterButton).toBeInTheDocument();
      // Clicks on type filter button.
      fireEvent.click(filterButton);
      // Fetches the current Pokémon type displayed.
      const currentType = screen.getByTestId('pokemon-type');
      // Checks if every Pokémon type has got its own filter.
      // Checks if filter type clicked matches Pokémon type displayed.
      expect(filterButton.innerHTML === everyType[index]
        && filterButton.innerHTML === currentType.textContent)
        .toBeTruthy();
    });
    // Fetches the "all Pokémons" button.
    const allButton = screen.getByRole('button', {
      name: /all/i });
    expect(allButton).toBeInTheDocument();
  });
  it('Checks for all button and tests its functionality', () => {
    renderWithRouter(<App />);
    // Fetches 'all Pokémons' button.
    const allButton = screen.getByRole('button', {
      name: /all/i });
    expect(allButton).toBeInTheDocument();
    // Fetches first Pokémon in data.
    const firstPokeType = pokemons[0].type;
    // Clicks on All Button.
    fireEvent.click(allButton);
    // Checks if the Pokémon displayed matches with the first Pokémon on data.
    const currentType = screen.getByTestId('pokemon-type');
    expect(firstPokeType === currentType.textContent);
  });
});
