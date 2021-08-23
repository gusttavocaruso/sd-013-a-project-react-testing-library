import React from 'react';
import userEvent from '@testing-library/user-event';

import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

describe('should test the Pokedex component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const pokeName = 'pokemon-name';

  it('should test if have an h2 with text "Encountered Pokemons"', () => {
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(header).toBeInTheDocument();
  });

  it('should test if have an button with "Proximo Pokemon" text', () => {
    const nextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(nextPoke).toBeInTheDocument();
  });

  it('should show next poke when click on "Proximo pokémon" button', () => {
    // o ideal neste teste, seria passar um laço de iteração para pegar
    // os nomes de cada pokemon a cada iteração, ao invés de
    // acessar indice por indice, engrossando o código
    // para isso, tenho que importar os dados dos pokemons
    const id = screen.getByTestId(pokeName);
    const nextPoke = screen.getByText('Próximo pokémon');

    expect(id).toBeInTheDocument();

    data.map((poke, i) => {
      const { name } = poke;
      expect(id).toHaveTextContent(poke.name);
      userEvent.click(nextPoke);
      return expect(id).not.toHaveTextContent(name[i]);
    });
  });

  it('should test if when clicked on last poke, the first will be shown', () => {
    const nextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });
    const id = screen.getByTestId(pokeName);
    data.forEach((_, i) => {
      if (i < data.length - 1) userEvent.click(nextPoke);
    });

    const lastPoke = data[8].name;
    expect(id).toHaveTextContent(lastPoke);

    const firstPoke = data[0].name;
    userEvent.click(nextPoke);

    expect(id).toHaveTextContent(firstPoke);
  });

  it('should show just one Pokémon per time', () => {
    const poke = screen.getAllByTestId(pokeName);

    expect(poke.length).toBe(1);
  });

  it('should test if the Pokédex have filters buttons', () => {
    const pokeTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const nameTypeButton = 'pokemon-type-button';
    const allTypesButton = screen.getAllByTestId(nameTypeButton);

    expect(allTypesButton.length).toBe(pokeTypes.length);
  });

  it('should render Pokemons of the chosen type', () => {
    const pokeTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const nameTypeButton = 'pokemon-type-button';
    const allTypesButton = screen.getAllByTestId(nameTypeButton);

    allTypesButton.map((b, i) => {
      expect(b).toBeInTheDocument();
      return expect(allTypesButton[i]).toHaveTextContent(pokeTypes[i]);
    });
  });

  it('should verify if "All" button is visible', () => {
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });

    expect(allButton).toBeInTheDocument();
  });

  it('should verify if have "All" button is clicked', () => {
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });

    userEvent.click(allButton);

    const id = screen.getByTestId(pokeName);
    const nextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });

    data.forEach((_, i) => {
      expect(id).toHaveTextContent(data[i].name);

      userEvent.click(nextPoke);

      expect(allButton).toBeInTheDocument();
    });
  });
});
