import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing \'PokemonDetails\' component', () => {
  const pokeNameTestId = 'pokemon-name';
  it('should have informations about pokemon', () => {
    renderWithRouter(<App />);

    const { innerHTML: pokeName } = screen.getByTestId(pokeNameTestId);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { innerHTML: pokeNameDetails } = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    const { innerHTML: summaryText } = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const resumeDetails = screen.getByText(/roasts hard berries with electricity/i);

    expect(resumeDetails).toBeInTheDocument();
    expect(summaryText).toBe('Summary');
    expect(pokeNameDetails).toBe(`${pokeName} Details`);
  });

  it('should no have \'more details\' link', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const shouldNotExist = screen.queryByRole('link', { name: /more details/i });
    expect(shouldNotExist).toBeFalsy();
  });

  it('should have a map section', () => {
    renderWithRouter(<App />);

    const { innerHTML: pokeName } = screen.getByTestId(pokeNameTestId);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { innerHTML: locationTitle } = screen.getByRole('heading', {
      name: /game locations of/i,
      level: 2,
    });
    const locationMap = screen.getAllByRole('img', { name: `${pokeName} location` });

    expect(locationMap.length >= 1).toBeTruthy();
    expect(locationMap[0].alt).toBe(`${pokeName} location`);
    expect(locationMap[0].src).toBeTruthy();
    expect(locationTitle).toBe(`Game Locations of ${pokeName}`);
  });

  it('should have a label and a favorite\' checkbox', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const typeFavoriteInput = screen.getByLabelText(/pokémon favoritado/i);
    expect(typeFavoriteInput).toBeInTheDocument();
    expect(typeFavoriteInput.type).toBe('checkbox');
  });

  it('should have functional favorite\' checkbox', () => {
    renderWithRouter(<App />);

    const { innerHTML: pokeName } = screen.getByTestId('pokemon-name');
    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noPokeTitle = screen.getByText(/no favorite pokemon/i);
    expect(noPokeTitle).toBeInTheDocument();
    userEvent.click(homeLink);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const typeFavoriteInput = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(typeFavoriteInput);
    const favoriteImgOne = screen.getByRole('img', {
      name: `${pokeName} is marked as favorite`,
    });
    expect(favoriteImgOne).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const favoriteImgTwo = screen.getByRole('img', {
      name: `${pokeName} is marked as favorite`,
    });
    expect(favoriteImgTwo).toBeInTheDocument();
  });
});
