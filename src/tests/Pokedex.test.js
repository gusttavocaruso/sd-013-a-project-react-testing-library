import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1. Test the component Pokedex', () => {
  it('Test if the page have a h2 heading with the text Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titleH2 = screen.getByText(/Encountered pokémons/i);
    expect(titleH2).toBeInTheDocument();
  });
});
describe(`2. Test if it is shown the next list's
 pokemon when the button 'próximo pokémon' is clicked
 and the first must be shown when be in the last pokemon's list`, () => {
  it('Test if it is shown the next pokemon ', () => {
    renderWithRouter(<App />);
    const bttNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemons = ['pikachu', 'charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    pokemons.forEach(() => userEvent.click(bttNextPokemon));

    const encounteredPoke = screen.getByText(/pikachu/i);

    expect(encounteredPoke).toBeInTheDocument();
    expect(bttNextPokemon).toBeInTheDocument();
  });
  it('Test if it is shown only a pokemon by once', () => {
    renderWithRouter(<App />);
    const bttNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemons = ['pikachu', 'charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    pokemons.forEach(() => {
      userEvent.click(bttNextPokemon);
      const pokeName = screen.getAllByTestId(/pokemon-name/i);
      expect(pokeName.length).toBe(1);
    });
  });
  it('Test if the pokedex has the filters buttons', () => {
    renderWithRouter(<App />);
    const SIZE_BUTTON = 7;
    const bttFilters = screen.getAllByTestId(/pokemon-type-button/i);
    expect(bttFilters.length).toBe(SIZE_BUTTON);
  });
  it(`From the selection of type button,
   the pokedex must round only the pokemons these types.`, () => {
    renderWithRouter(<App />);
    const bttFire = screen.getByRole('button', {
      name: /Fire/i,
    });

    userEvent.click(bttFire);

    const pokemons = ['charmander', 'Rapidash'];
    pokemons.forEach(() => {
      userEvent.click(bttFire);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent('Fire');
    });

    expect(bttFire).toBeInTheDocument();
  });
  it('The All button must be always visible', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /All/i,
      hidden: false,
    });

    expect(allButton).toBeInTheDocument();
  });
  describe('Test if the pokedex have a button to reset the filter', () => {
    it('The text must be "All"', () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', {
        name: /All/i,
      });
      expect(allButton).toBeInTheDocument();
    });
    it(`The pokedex should show the
     pokemons usually when the all button to be clicked`, () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', {
        name: /All/i,
      });
      userEvent.click(allButton);

      const bttNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      userEvent.click(bttNextPokemon);
      expect(screen.getByText('Electric')).toBeInTheDocument();
      userEvent.click(bttNextPokemon);
      expect(screen.getByText('Fire')).toBeInTheDocument();
    });
    it('To load the page, the selected filter should be "All"', () => {
      renderWithRouter(<App />);
      const bttNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      userEvent.click(bttNextPokemon);
      expect(screen.getByText('Electric')).toBeInTheDocument();
      userEvent.click(bttNextPokemon);
      expect(screen.getByText('Fire')).toBeInTheDocument();
    });
  });
});
