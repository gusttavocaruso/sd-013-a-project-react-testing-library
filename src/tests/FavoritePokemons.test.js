import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';

describe('FavoritePokemon.js Tests', () => {
  test('test if the message "no fav..." is displayed if there are no favorites', () => {
    // Acess screen elements
    RenderWithRouter(<FavoritePokemons />);
    const textNoFavorites = 'No favorite pokemon found';
    const text = screen.getByText(textNoFavorites);
    // Test
    expect(text).toBeInTheDocument();
  });

  test('test if all favorite Pokemon cards are displayed', () => {
    const myPokemon = [{
      id: 78,
      name: 'Rapidash',
      type: 'Fire',
      averageWeight: {
        value: '95.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Route 28',
          map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
        },
        {
          location: 'Johto Mount Silver',
          map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
        },
      ],
      summary: 'At full gallop, its four hooves barely touch.',
    }];
    RenderWithRouter(<FavoritePokemons pokemons={ myPokemon } />);
    const p1 = screen.getByText('Rapidash');
    expect(p1).toBeInTheDocument();
  });
});
