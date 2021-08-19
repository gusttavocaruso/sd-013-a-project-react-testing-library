import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Test "PokemonDetails" page', () => {
  const { name, foundAt, summary } = pokemons[0];

  it('Renders selected pokemon informations', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const pokeNameDetails = screen.getByRole('heading', { name: `${name} Details` });
    expect(pokeNameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const detailsSection = screen.getByRole('heading', { name: 'Summary' });
    expect(detailsSection).toBeInTheDocument();

    const summaryParagraph = screen.getByText(summary);
    expect(summaryParagraph).toBeInTheDocument();
  });

  it('Renders map locations section', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const mapHeading = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(mapHeading).toBeInTheDocument();

    const mapImages = screen.getAllByAltText(`${name} location`);
    expect(mapImages).toHaveLength(foundAt.length);

    foundAt.forEach(({ location, map }, i) => {
      const locationInfo = screen.getByText(location);
      expect(locationInfo).toBeInTheDocument();
      expect(mapImages[i].src).toBe(map);
      expect(mapImages[i].alt).toBe(`${name} location`);
    });
  });

  it('Tests if user can favorite a pokemon from details page', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const favCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favCheck).toBeInTheDocument();
    expect(favCheck.checked).toBe(false);
    userEvent.click(favCheck);
    expect(favCheck.checked).toBe(true);

    const favPokesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokesLink);

    const favPokeName = screen.getByText(name);
    expect(favPokeName).toBeInTheDocument();
  });
});
