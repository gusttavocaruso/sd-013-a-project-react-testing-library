import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Checks if detailed Pokémon information is shown', () => {
  it('Checks if detailed Pokémon information is shown', () => {
    renderWithRouter(<App />);
    // Clicks on more details link
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // First Pokémon of data
    const { name, summary } = pokemons[0];
    // Checks for a "<name> Details" text
    const nameDetails = screen.getByRole('heading', {
      name: /details/i,
    });
    const correctDetailsTitle = `${name} Details`;
    expect(nameDetails.textContent).toEqual(correctDetailsTitle);
    // Checks for details link
    expect(moreDetails).not.toBeInTheDocument();
    // Checks for an h2 with the 'Summary' text
    const summaryHeading = screen.getByRole('heading', {
      value: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();
    // Checks for a summary text about the Pokémon
    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('Checks the map section', () => {
    renderWithRouter(<App />);
    // Clicks on more details link
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // First Pokémon of data
    const { name, foundAt } = pokemons[0];
    // Checks for an h2 with the 'Game Locations of <name>' text
    const locationsHeading = screen.getByRole('heading', {
      value: 2,
      name: /game locations of/i,
    });
    expect(locationsHeading.textContent).toEqual(`Game Locations of ${name}`);
    // Checks if locations maps are show as well as their names
    const everyMap = screen.getAllByAltText(`${name} location`);
    foundAt.forEach((locationInfo, index) => {
      expect(locationInfo.map).toEqual(everyMap[index].src);
      const locationName = screen.getByText(locationInfo.location);
      expect(locationName).toBeInTheDocument();
    });
  });
  it('Checks if the user is able to favorite Pokémon', () => {
    renderWithRouter(<App />);
    // Clicks on more details link
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Checks if the user is able to mark a Pokémon as favorite
    const favCheckbox = screen.getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();
    expect(favCheckbox).not.toBeChecked();
    // Clicks to favorite Pokémon
    fireEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();
    // Clicks to remove Pokémon from favorites
    fireEvent.click(favCheckbox);
    expect(favCheckbox).not.toBeChecked();
    // Checks for the label text
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();
  });
});
