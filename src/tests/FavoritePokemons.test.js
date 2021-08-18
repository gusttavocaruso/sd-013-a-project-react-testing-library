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
      // history.location.pathname pega o endereço da página.
      // Verificamos se o texto que aparece quando clicamos nesse link no navegador é o "/favorites".
      expect(history.location.pathname).toEqual('/favorites');
      // Guarda na variável notFound o elemento com o texto "No favorite pokemon found".
      const notFound = screen.getByText(/No favorite pokemon found/i);
      // Testa se o retorno da variável notFound está no documento
      expect(notFound).toBeInTheDocument();
    });

    test('Teste se é exibido todos os cards de pokémons favoritados',
    () => {
      // Desconstroi o history do renderWithRouter do componente App
      const { history } = renderWithRouter(<App />);
      