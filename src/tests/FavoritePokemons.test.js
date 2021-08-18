import React from 'react';
import { screen } from '@testing-library/react';
import Favorites from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

it('deve renderizar o pokemon favorito', () => {
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
  renderWithRouter(<Favorites pokemons={ pokemon } />);
  const favorite = screen.getByText('Pikachu');
  expect(favorite).toBeInTheDocument();
});

it('renderiza o texto "No favorite pokemon found" quando não tem favorito', () => {
  renderWithRouter(<Favorites />);
  const noFavorites = screen.getByText(/No favorite pokemon found/i);
  expect(noFavorites).toBeInTheDocument();
});

// Exercicio feito com ajuda de Lanai Conçeição e Luiza Antiques
