import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const { name, foundAt } = Pokemons[0];
  const moreDetails = 'More details';

  it('will test if the card have all information about the pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const titleDetails = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    expect(titleDetails).toBeInTheDocument();
    const linkToDetails = screen.queryByRole('link', {
      name: 'More details',
    });
    expect(linkToDetails).toBeFalsy();
    const sumaryTitle = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(sumaryTitle).toBeInTheDocument();
    const pokeDetails = screen.getByText(/This intelligent Pokémon/i);
    expect(pokeDetails).toBeInTheDocument();
  });
  it('will test if the page have all map location of pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const mapDetails = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
    });
    expect(mapDetails).toBeInTheDocument();
    const locationPoke = screen.getAllByAltText(`${name} location`);
    expect(locationPoke.length).toBe(foundAt.length);
    foundAt.forEach((location, index) => {
      expect(locationPoke[index].src).toBe(location.map);
      const locationPokeText = screen.getByText(location.location);
      expect(locationPokeText).toBeInTheDocument();
    });
  });
  it('will test if the page have a checkbox to fav poke', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: moreDetails }));

    const labelFavoritePoke = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavoritePoke).toBeInTheDocument();
  });
});
