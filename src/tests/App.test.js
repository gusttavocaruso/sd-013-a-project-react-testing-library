// PROJETO FEITO COM AJUDA DO MATHEUS DUARTE , ROGERIO , JOSUÉ, RAFAEL PELO DISCORD.
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RouterNHistory from './RouterNHistory';

describe('Exercicio 1', () => {
  describe('Header', () => {
    test('Carrega o Header', async () => {
      RouterNHistory(<App />);

      expect(screen.getByRole('link', { name: /home/i }));
      expect(screen.getByRole('link', { name: /about/i }));
      expect(screen.getByRole('link', { name: /favorite pokémons/i }));
    });
  });
  describe('Redirect', () => {
    test('Funcional Redirect Home', async () => {
      const { history } = RouterNHistory(<App />);

      const home = screen.getByRole('link', { name: /home/i });
      userEvent.click(home);

      expect(history.location.pathname).toEqual('/');
    });
    test('Funcional Redirect About', async () => {
      const { history } = RouterNHistory(<App />);

      const about = screen.getByRole('link', { name: /about/i });
      userEvent.click(about);

      expect(history.location.pathname).toEqual('/about');
    });
    test('Funcional Redirect Fav.Pokemons', async () => {
      const { history } = RouterNHistory(<App />);

      const FavPokemons = screen.getByRole('link',
        { name: /favorite pokémons/i });

      userEvent.click(FavPokemons);

      expect(history.location.pathname).toEqual('/favorites');
    });
    test('Funcional Redirect Not Found', async () => {
      const { history } = RouterNHistory(<App />);

      history.push('/favorites-pokemons');

      const error404 = screen.getByText(/Page requested not found/i);

      expect(error404).toBeInTheDocument();
    });
  });
});
