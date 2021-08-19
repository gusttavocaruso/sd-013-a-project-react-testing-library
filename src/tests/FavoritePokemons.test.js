import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando componente FavoritePokemons.js', () => {
  it('É exibida na tela a mensagem "No favorite pokemon found"'
  + ', se não tiver pokemons favoritos', () => {
    renderWithRouter(<App />);

  });
});
