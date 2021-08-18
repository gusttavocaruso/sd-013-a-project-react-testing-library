import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 03 - Teste o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido "No favorite pokemon found", se não tiver pokémons favoritos',
    () => {
      // Desconstroi o history do renderWithRouter do componente App
      const { history } = renderWithRouter(<App />);
      // Busca um elemento link com o endereço "/favorite pokémons" e guarda na variável favoritePokemons
      const favoritePokemons = screen.getByRole('link',
        { name: /favorite pokémons/i });
      // Simula o click no elemento que está na variável favoritePokemons
      userEvent.click(favoritePokemons);
      