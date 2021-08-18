import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RouterRender from './RouterRender';
import App from '../App';
import pokemons from '../data';

const testId = 'pokemon-name';

describe('Testing Pokedex component', () => {
  it('Test if the page has a h2 element with the text "Encountered pokémons".', () => {
    RouterRender(<App />);
    const h2 = screen.getByText(/Encountered pokémons/i);

    expect(h2).toBeInTheDocument();
  });

  it('Test if the list show the next pokémon when the next button is clicked', () => {
    RouterRender(<App />);
    const btn = screen.getByTestId('next-pokemon');

    expect(btn).toHaveTextContent('Próximo pokémon');
    expect(btn).toBeInTheDocument();

    const pokemonTestId = screen.getByTestId(testId);
    expect(pokemonTestId).toBeInTheDocument();

    pokemons.map((pokemon, index) => {
      expect(pokemonTestId).toHaveTextContent(pokemon.name);
      userEvent.click(btn);

      return expect(pokemonTestId).not.toHaveTextContent(
        pokemons[index].name,
      );
    });

    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(btn);
    });

    const lastPokemon = pokemons[8].name;
    expect(pokemonTestId).toHaveTextContent(lastPokemon);

    const firstPokemon = pokemons[0].name;
    userEvent.click(btn);

    expect(pokemonTestId).toHaveTextContent(firstPokemon);
  });

  it('Test if only one pokemon is shown at a time', () => {
    RouterRender(<App />);
    const pokemonTestId = screen.getAllByTestId('pokemon-name');

    expect(pokemonTestId.length).toBe(1);
  });
});

describe('Test if the pokédex has the filter buttons', () => {
  it('There should be a Pokémon filtering button, without repeating', () => {
    RouterRender(<App />);
    const btns = screen.getAllByTestId('pokemon-type-button');
    const allPokemons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    expect(btns.length).toBe(allPokemons.length);

    btns.map((btn, index) => {
      expect(btn).toBeInTheDocument();

      return expect(btns[index]).toHaveTextContent(
        allPokemons[index],
      );
    });
  });

  it('Pokédex should only circulate by Pokémon of that type', () => {
    RouterRender(<App />);
    const pokemonName = screen.getByTestId(testId);
    const caterpieBtn = screen.getByRole('button', { name: /Bug/i });

    expect(caterpieBtn).toBeInTheDocument();

    userEvent.click(caterpieBtn);

    expect(pokemonName).toHaveTextContent(/Caterpie/i);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    expect(nextPokemon).toHaveAttribute('disabled', '');

    const alakazamBtn = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(alakazamBtn);
    userEvent.click(nextPokemon);

    expect(pokemonName).toHaveTextContent(/Mew/i);

    userEvent.click(nextPokemon);

    expect(pokemonName).toHaveTextContent(/Alakazam/i);
  });

  it('Test if the Pokédex has a button that reset the filter', () => {
    RouterRender(<App />);
    const pokemonName = screen.getByTestId(testId);
    const allBtns = screen.getByRole('button', { name: /all/i });

    expect(allBtns).toBeInTheDocument();

    userEvent.click(allBtns);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    pokemons.forEach((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(
        pokemons[index].name,
      );

      userEvent.click(nextPokemon);

      expect(allBtns).toBeInTheDocument();
    });
  });
});
