import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const MORE_DETAILS = 'More details';

const testedPokemon = pokemons[0];
const { name, summary, foundAt } = testedPokemon;

describe('Pokemon.js tests', () => {
  test('if pokemon details renders', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(linkMoreDetails);

    const pokemonDetailsHeader = screen
      .getByRole('heading', { name: `${name} Details` });
    expect(pokemonDetailsHeader).toBeInTheDocument();

    expect(linkMoreDetails).not.toBeInTheDocument();

    const summaryHeader = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryHeader).toBeInTheDocument();

    const paragraph = screen.getByText(`${summary}`);
    expect(paragraph).toBeInTheDocument();
  });
  test('if more details renders pokemon locations maps', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(linkMoreDetails);

    const locationsHeader = screen
      .getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationsHeader).toBeInTheDocument();

    const locations = screen.getAllByRole('img', { name: `${name} location` });
    expect(locations.length).toStrictEqual(foundAt.length);

    locations.forEach((location, index) => {
      expect(location.src).toStrictEqual(foundAt[index].map);
      expect(location.alt).toStrictEqual(`${name} location`);
    });
  });
  test('if favorite in more details renders', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(linkMoreDetails);

    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheckbox).toBeInTheDocument();

    const checkboxlabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkboxlabel).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    expect(star).not.toBeInTheDocument();
  });
});
