import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemonMock = [{
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
}];

describe('Testando o componente FavoritePokemons.', () => {
  test('Testa se é exibida a mensagem "No favorite pokemon found".', () => {
    render(<FavoritePokemons />);

    const pokemonNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });

  test('Testa se é exibido um pokemon favorito.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons pokemons={ pokemonMock } />
      </Router>,
    );

    const favoritePokemon = screen.getByText(/pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
