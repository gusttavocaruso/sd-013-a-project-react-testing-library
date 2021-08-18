import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import pokemons from '../data';

describe('Testing \'Pokedex\' component', () => {
  const pokeNameId = 'pokemon-name';
  const nextPokeButtonId = 'next-pokemon';

  it('should have an h2 with the text \'Encountered pokémons\'', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const titlePokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(titlePokedex).toBeInTheDocument();
  });

  it('should have another pokemon after clicking the \'next pokemon\' button', () => {
    renderWithRouter(<App />);

    const nextPokeButton = screen.getByTestId(nextPokeButtonId);
    expect(nextPokeButton).toHaveTextContent(/próximo pokémon/i);

    const pokeImageOneAlt = screen.getByRole('img', { name: /pikachu sprite/i }).alt;

    userEvent.click(nextPokeButton);

    const pokeImageTwoAlt = screen.getByRole('img', { name: /charmander sprite/i }).alt;

    expect(pokeImageOneAlt).not.toBe(pokeImageTwoAlt);
  });

  it('should have a loop when finished the list of pokemons', () => {
    renderWithRouter(<App />);

    const nextPokeButton = screen.getByTestId(nextPokeButtonId);
    const pokeNameOne = screen.getByTestId(pokeNameId).innerHTML;

    pokemons.forEach(() => userEvent.click(nextPokeButton));

    const pokeNameTwo = screen.getByTestId(pokeNameId).innerHTML;

    expect(pokeNameOne).toStrictEqual(pokeNameTwo);
  });

  it('should have just one pokemon card in each screen', () => {
    renderWithRouter(<App />);

    const nextPokeButton = screen.getByTestId(nextPokeButtonId);

    const pokeNameOne = screen.getAllByTestId(pokeNameId);
    userEvent.click(nextPokeButton);
    expect(pokeNameOne.length).toBe(1);

    const pokeNameTwo = screen.getAllByTestId(pokeNameId);
    userEvent.click(nextPokeButton);
    expect(pokeNameTwo.length).toBe(1);

    const pokeNameThree = screen.getAllByTestId(pokeNameId);
    userEvent.click(nextPokeButton);
    expect(pokeNameThree.length).toBe(1);
  });

  it('should have just, and no more, filter type button', () => {
    renderWithRouter(<App />);

    const allFiltersButtons = screen.getAllByTestId('pokemon-type-button');
    const DEFAULT_TYPES = [
      'Electric', 'Fire',
      'Bug', 'Poison',
      'Psychic', 'Normal',
      'Dragon',
    ];
    const verify = allFiltersButtons.every((button, index) => (
      button.innerHTML === DEFAULT_TYPES[index]
    ));

    expect(verify).toBeTruthy();
  });

  it('should have work filters buttons', () => {
    renderWithRouter(<App />);

    const buttonAllTypes = screen.getByRole('button', { name: /all/i });
    expect(buttonAllTypes).toBeInTheDocument();

    const fireFilter = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireFilter);

    const typeText = screen.getByTestId('pokemon-type');

    expect(buttonAllTypes).toBeInTheDocument();
    expect(fireFilter.innerHTML).toBe(typeText.innerHTML);

    const nextPokeButton = screen.getByTestId(nextPokeButtonId);
    userEvent.click(nextPokeButton);

    expect(buttonAllTypes).toBeInTheDocument();
    expect(fireFilter.innerHTML).toBe(typeText.innerHTML);
  });

  it('should have work the filter \'all\' button', () => {
    renderWithRouter(<App />);

    const buttonAllTypes = screen.getByRole('button', { name: /all/i });
    expect(buttonAllTypes).toBeInTheDocument();
    expect(buttonAllTypes.innerHTML).toBe('All');

    const fireFilter = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireFilter);

    const typeText = screen.getByTestId('pokemon-type');
    const nextPokeButton = screen.getByTestId(nextPokeButtonId);
    const typeOne = typeText.innerHTML;

    userEvent.click(buttonAllTypes);
    expect(typeText.innerHTML).not.toBe(typeOne);

    userEvent.click(nextPokeButton);
    expect(typeText.innerHTML).toBe(typeOne);
  });
});
