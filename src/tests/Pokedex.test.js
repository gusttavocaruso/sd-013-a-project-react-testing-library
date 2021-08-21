import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';

const pokemonsMock = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard '
    + 'berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength '
    + 'of its life force. If it is weak, the flame also burns weakly.',
  },
];

const isPokemonFavoriteByIdMock = [];

describe('Testa o componente Pokedex', () => {
  it('Testa se possui um h2 escrito "Encountered pokémons"', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </Router>,
    );
    const texto = screen.getByRole('heading', {
      level: 2,
    });
    expect(texto.textContent).toBe('Encountered pokémons');
  });
  it('Teste se é exibido o próximo Pokémon da lista '
  + 'quando o botão Próximo pokémon é clicado e '
  + 'se All está sempre visível e se reseta o filtro', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </Router>,
    );
    const noFilter = screen.getByText('All');
    expect(noFilter).toBeVisible();
    userEvent.click(noFilter);
    const pokemonAtual = screen.getByText(/pikachu/i);
    expect(pokemonAtual).toBeInTheDocument();
    const proxButton = screen
      .getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(proxButton);
    const pokemonProx = screen.getByText(/charmander/i);
    expect(pokemonProx).toBeInTheDocument();
  });
  it('Teste se aparece um pokemon por vez', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </Router>,
    );
    const pokes = screen.getAllByTestId('pokemon-name');
    expect(pokes.length).toBe(1);
  });
  it('Teste se existe um botão de filtro pra cada '
  + 'filtro e se só circula por pokemons daquele tipo.', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Pokedex
          pokemons={ pokemonsMock }
          isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
        />
      </Router>,
    );
    const proxButton = screen
      .getByRole('button', { name: /próximo pokémon/i });
    const theFilters = screen
      .getAllByTestId('pokemon-type-button');
    theFilters.forEach((filtro) => {
      userEvent.click(filtro);
      const tipoAtual = screen.getByTestId('pokemon-type');
      expect(filtro.textContent).toBe(tipoAtual.textContent);
      userEvent.click(proxButton);
      expect(filtro.textContent).toBe(tipoAtual.textContent);
    });
  });
});
