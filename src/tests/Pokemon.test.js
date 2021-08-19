import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests the Pokemon component', () => {
  it('Checks if the correct information about a single Pokémon is shown', () => {
    renderWithRouter(<App />);
    // Clicks on more details link
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Fetches the name of the Pokémon displayed
    const displayedName = screen.getByTestId(/pokemon-name/i);
    expect(displayedName).toBeInTheDocument();
    // Filters the database by the Pokémon name
    const filteredPoke = pokemons
      .filter((pokemon) => pokemon.name === displayedName.textContent)[0];
    // Destructuring filtered Pokémon
    const { name, type, averageWeight: { value, measurementUnit }, image } = filteredPoke;
    // Checks if the Pokémon name on screen matches the one filtered
    expect(displayedName.textContent).toEqual(name);
    // Checks if the Pokémon type on screen matches the one filtered
    const displayedType = screen.getByTestId(/pokemon-type/i);
    expect(displayedType).toBeInTheDocument();
    expect(displayedType.textContent).toEqual(type);
    // Checks if the average weigth on screen matches the one filtered
    const displayedWeight = screen.getByTestId(/pokemon-weight/i);
    expect(displayedWeight).toBeInTheDocument();
    const pokeWeight = `Average weight: ${value} ${measurementUnit}`;
    expect(displayedWeight.textContent).toEqual(pokeWeight);
    // Checks if the image displayed on screen matches the Pokémon sprite and if the alt text is correct
    const pokeSprite = screen.getByAltText(/sprite/i);
    expect(pokeSprite.src).toEqual(image);
    expect(pokeSprite.alt).toEqual(`${name} sprite`);
  });

  it('Checks if the "more details" link is correct', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    // Fetches the name of the Pokémon displayed
    const displayedName = screen.getByTestId(/pokemon-name/i);
    // Filters the database by the Pokémon name
    const filteredPoke = pokemons
      .filter((pokemon) => pokemon.name === displayedName.textContent)[0];
    expect(moreDetails.href).toEqual(`http://localhost/pokemons/${filteredPoke.id}`);
  });
  it('Checks if the pathname is correct acordding to Pokémon id', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Fetches the name of the Pokémon displayed
    const displayedName = screen.getByTestId(/pokemon-name/i);
    // Filters the database by the Pokémon name
    const filteredPoke = pokemons
      .filter((pokemon) => pokemon.name === displayedName.textContent)[0];
    history.push(`/pokemons/${filteredPoke.id}`);
    expect(history.location.pathname).toBe(`/pokemons/${filteredPoke.id}`);
  });
  it('Checks if theres an star icon displayed on a favorite Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(moreDetails);
    // Fetches the favorite option
    const favoriteOption = screen.getByLabelText(/favoritado/i);
    fireEvent.click(favoriteOption);
    // Fetches the name of the Pokémon displayed
    const displayedName = screen.getByTestId(/pokemon-name/i);
    // Filters the database by the Pokémon name
    const filteredPoke = pokemons
      .filter((pokemon) => pokemon.name === displayedName.textContent)[0];
    // Fetches favorite star
    const favoriteStr = screen.getByAltText(`${filteredPoke.name} is marked as favorite`);
    expect(favoriteStr).toBeInTheDocument();
    expect(favoriteStr.src).toBe('http://localhost/star-icon.svg');
  });
});
