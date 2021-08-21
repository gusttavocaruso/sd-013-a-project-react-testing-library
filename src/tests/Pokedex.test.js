import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Requisito 5 - Pokedex.js', () => {
  test('Verifica se página contém um heading h2 "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(screen.getByRole('heading', {
      name: /encountered pokémons/i,
      exact: false,
      level: 2,
    })).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista', async () => {
    // Refatorar para obter esse array dinamicamente ou trabalhar com um dataset fixo (mock)
    const arrAllNamesPokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    // -----------------------------------------------------------
    const { history } = renderWithRouter(<App />);
    history.push('/');

    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
      exact: false,
    });
    expect(buttonNextPokemon).toBeInTheDocument();

    arrAllNamesPokemons.forEach(async (name, index) => {
      userEvent.click(buttonNextPokemon);
      const dinamicIndex = (index + 1) % arrAllNamesPokemons.length;
      const namePokemonText = await screen.findByText(arrAllNamesPokemons[dinamicIndex]);
      expect(namePokemonText).toBeInTheDocument();
    });

    // Refatorar para obter array dinamicamente
    const arrTypeFire = [
      'Charmander',
      'Rapidash',
    ];
    // --------------------------------------
    const firePokemonTypeButton = screen.getByRole('button', {
      name: /fire/i,
    });
    expect(firePokemonTypeButton).toBeInTheDocument();
    // expect(firePokemonTypeButton).toHaveAttribute('dataTestId', 'pokemon-type-button');

    arrTypeFire.forEach(async (firePokemon, index) => {
      userEvent.click(buttonNextPokemon);
      const dinamicIndexForFire = (index + 1) % arrTypeFire.length;
      const namePokemonFire = await screen.findByText(arrTypeFire[dinamicIndexForFire]);
      expect(namePokemonFire).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const objTypesAndNames = [
      {
        type: 'All',
        name: [
          'Pikachu',
          'Charmander',
          'Caterpie',
          'Ekans',
          'Alakazam',
          'Mew',
          'Rapidash',
          'Snorlax',
          'Dragonair',
        ],
      },
      {
        type: 'Electric',
        name: ['Pikachu'],
      },
      {
        type: 'Fire',
        name: ['Charmander', 'Rapidash'],
      },
      {
        type: 'Bug',
        name: ['Caterpie'],
      },
      {
        type: 'Poison',
        name: ['Ekans'],
      },
      {
        type: 'Psychic',
        name: ['Alakazam', 'Mew'],
      },
      {
        type: 'Normal',
        name: ['Snorlax'],
      },
      {
        type: 'Dragon',
        name: ['Dragonair'],
      },
    ];

    const { history } = renderWithRouter(<App />);
    history.push('/');
    const allButton = screen.getByRole('button', {
      name: /all/i,
      exact: false,
    });
    expect(allButton).toBeInTheDocument();

    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
      exact: false,
    });

    objTypesAndNames.forEach(async (pokemon) => {
      const typeButton = screen.getByRole('button', {
        name: pokemon.type,
      });
      expect(typeButton).toBeInTheDocument();
      expect(typeButton).toHaveAttribute('data-testid', 'pokemon-type-button');
      expect(allButton).toBeInTheDocument();
      userEvent.click(typeButton);
      pokemon.name.forEach(async (item, index) => {
        userEvent.click(buttonNextPokemon);
        const dinamicIndex = (index + 1) % pokemon.name.length;
        const namePokemon = await screen.findByText(pokemon.name[dinamicIndex]);
        expect(namePokemon).toBeInTheDocument();
      });
    });

    userEvent.click(allButton);
    objTypesAndNames[0].name.forEach(async (pok, index) => {
      userEvent.click(buttonNextPokemon);
      const dinamicIndex = (index + 1) % objTypesAndNames[0].name.length;
      const namePokemon = await screen.findByText(objTypesAndNames[0].name[dinamicIndex]);
      expect(namePokemon).toBeInTheDocument();
    });
  });
});

describe('Verifica atributo especifico exigido pelo striker (dataTestId)', () => {
  test('Verifica se o data-testid do comp button é informado', () => {
    // Source: PR do Leandro Liduvino
    // https://github.com/tryber/sd-013-a-project-react-testing-library/pull/16/files
    // Pelo meu desenvolvimento o data-testid verificado pelo stryker não estava sendo reconhecido
    // Importei o dataset original 'data', declarei um objeto com dois ids de pokemons favoritos
    // utilizei a função renderWithRouter para renderizar o componente Pokedex
    // Daí fiz um expect para o total de buttons que continham a expressão "pokemon-type-button", que para esse dataset é igual a 7
    const favoritePokemons = { 25: true, 4: true };
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ favoritePokemons }
      />,
    );
    const allButtonsByType = screen.getAllByTestId('pokemon-type-button');
    const totalTypesPokemons = 7;
    expect(allButtonsByType.length).toBe(totalTypesPokemons);
  });
});
