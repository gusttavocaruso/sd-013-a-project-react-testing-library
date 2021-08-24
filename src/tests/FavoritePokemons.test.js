
import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    RenderWithRouter(<FavoritePokemons />);

    const getTextFavPokemons = screen.getByText(/No favorite pokemon found/i);
    expect(getTextFavPokemons).toBeInTheDocument();
  });

  test('Testa se renderiza o pokemon favorito', () => {
    const pokemon = [
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
        summary: '',
      },
    ];

    RenderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

    const getPokemon = screen.getByText('Pikachu');
    expect(getPokemon).toBeInTheDocument();
  });
});