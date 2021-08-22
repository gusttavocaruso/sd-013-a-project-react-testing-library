import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokemonMock = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Closing both its eyes heightens all its '
    + 'other senses. This enables it to use its abilities to their extremes.',
};

const match = {
  params: { id: '65' },
};

const isPokemonFavoriteById = {
  65: false,
};

const changeFav = (id) => {
  if (id === false) {
    isPokemonFavoriteById[65] = true;
  }
  if (id === true) {
    isPokemonFavoriteById[65] = false;
  }
};

describe('Testa o componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon '
    + 'selecionado são mostradas na tela', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ () => { } }
        />
      </Router>,
    );
    const pokeNameDet = screen.getByRole('heading', { name: /alakazam details/i });
    expect(pokeNameDet.textContent).toBe(`${pokemonMock.name} Details`);
    const linkDetails = screen.queryByText('More details');
    expect(linkDetails).toBeNull();
    const heading = screen.getByRole('heading', { name: /summary/i });
    expect(heading.textContent).toBe('Summary');
    const resumo = screen.getByText('Closing both its eyes heightens '
        + 'all its other senses. This enables it to use '
        + 'its abilities to their extremes.');
    expect(resumo.textContent).toBe(pokemonMock.summary);
  });
  it('Teste se existe na página uma seção com os mapas '
  + 'contendo as localizações do pokémon', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ () => { } }
        />
      </Router>,
    );
    const gameLocation = screen
      .getByRole('heading', { name: /game locations of alakazam/i });
    expect(gameLocation.textContent).toBe(`Game Locations of ${pokemonMock.name}`);
    screen.getByText(pokemonMock.foundAt[0].location);
    const img = screen.getByRole('img', { name: /alakazam location/i });
    expect(img.getAttribute('src')).toBe(pokemonMock.foundAt[0].map);
    expect(img.getAttribute('alt')).toBe(`${pokemonMock.name} location`);
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const isFavorite = isPokemonFavoriteById[65];
    render(
      <Router history={ createMemoryHistory() }>
        <PokemonDetails
          isPokemonFavoriteById={ isFavorite }
          match={ match }
          pokemons={ pokemons }
          onUpdateFavoritePokemons={ () => { } }
        />
      </Router>,
    );
    const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(check).toBeInTheDocument();
    changeFav(isPokemonFavoriteById[65]);
  });
});
