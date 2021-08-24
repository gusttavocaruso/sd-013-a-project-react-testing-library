import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokeMock = [{
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
  summary: 'This intelligent Pokémon roasts hard berries '
  + 'with electricity to make them tender enough to eat.',
}];

describe('Teste o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a msg No Favorite pokemons', () => {
    renderWithRouter(<FavoritePokemons />);
    const para = screen.getByText(/No favorite pokemon found/i);
    expect(para).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokeMock } />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    expect(screen.queryByText('No favorite pokemon found')).toBeNull();
  });
});
