import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const newPokemon = [{
      id: 23,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: {
        value: '6.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: '',
    }];

    renderWithRouter(<FavoritePokemons pokemons={ newPokemon } />);

    const pokemon = screen.getByText('Ekans');
    expect(pokemon).toBeDefined();
  });
});
