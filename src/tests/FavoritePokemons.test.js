import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Testa se é exibido na tela a mensagem \'No favorite pokemon found\'', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [
      { id: 1, name: 'Pikachu', averageWeight: { measurementUnit: 'm', value: '5' } },
      { id: 2, name: 'Bulbassauro', averageWeight: { measurementUnit: 'm', value: '5' } },
      { id: 3, name: 'Charmander', averageWeight: { measurementUnit: 'm', value: '5' } },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const names = screen.getAllByTestId('pokemon-name');
    expect(names[0]).toHaveTextContent('Pikachu');
  });
});
