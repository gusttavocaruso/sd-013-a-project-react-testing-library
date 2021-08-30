import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests for the PokemonDetails.js', () => {
  it('Checks if the selected pokemon detailes is shown', () => {
    renderWithRouter(<App />);
    // Clicks on the link for more datails about the selected pokemon.
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // First Pokémon of data.
    const { name, summary } = pokemons[0];
    // Checks for a "<name> Details" text.
    const nameDetails = screen.getByRole('heading', {
      name: /details/i,
    });
    const correctDetailsTitle = `${name} Details`;
    expect(nameDetails.textContent).toEqual(correctDetailsTitle);
    // Checks for the details link
    expect(moreDetails).not.toBeInTheDocument();
    // Checks for an h2 with the 'Summary' text.
    const summaryHeading = screen.getByRole('heading', {
      value: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();
    // Checks for a summary text about the Pokémon.
    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('Checks is there is a map section containing the location of the pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    const { name, foundAt } = pokemons[0];
    const locationsHeading = screen.getByRole('heading', {
      value: 2,
      name: /game locations of/i,
    });
    expect(locationsHeading.textContent).toEqual(`Game Locations of ${name}`);
    // Checks if the locations are shown as well as their names.
    const everyMap = screen.getAllByAltText(`${name} location`);
    foundAt.forEach((locationInfo, index) => {
      expect(locationInfo.map).toEqual(everyMap[index].src);
      const locationName = screen.getByText(locationInfo.location);
      expect(locationName).toBeInTheDocument();
    });
  });
  it('Checks if the user is able to favorite a certain Pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Checks if the user is able to mark a Pokémon as favorite.
    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
    expect(favCheckbox).not.toBeChecked();
    // Clicks to favorite Pokémon.
    fireEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();
    // Clicks to remove Pokémon from favorites.
    fireEvent.click(favCheckbox);
    expect(favCheckbox).not.toBeChecked();
    // Checks for the label text.
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
