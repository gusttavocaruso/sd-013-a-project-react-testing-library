import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';

const mockFavoritePoke = [{
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
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make'
  + 'them tender enough to eat.',
}];

describe('Teste o componente "<FavoritePokemons.js />"', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found", se a'
  + ' pessoa não tiver pokémons favoritos.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ [] } />
      </Router>,
    );
    const noFavoritePokemon = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ mockFavoritePoke } />
      </Router>,
    );
    const favoritePokemon = screen.getByText(/Pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
