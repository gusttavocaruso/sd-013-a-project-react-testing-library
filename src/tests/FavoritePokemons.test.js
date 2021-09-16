import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('exibe na tela a mensagem', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemon).toBeInTheDocument();
  });

  const mockedPokemons = [
    {
      id: 65,
      name: 'Alakazam',
      type: 'Psychic',
      averageWeight: {
        value: '48.0',
        measurementUnit: 'kg',
      },
    },
    {
      id: 143,
      name: 'Snorlax',
      type: 'Normal',
      averageWeight: {
        value: '460.0',
        measurementUnit: 'kg',
      },
    },
  ];

  it('deve exibir card de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockedPokemons } />);
    const alakazamCard = screen.getByText(/Alakazam/i);
    const snorlaxCard = screen.getByText(/Snorlax/i);

    expect(alakazamCard).toBeInTheDocument();
    expect(snorlaxCard).toBeInTheDocument();
  });
});
