import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('Testa se os links existem e funcionam', () => {
      renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: 'Home' });

      expect(home).toBeInTheDocument();

      const about = screen.getByRole('link', { name: 'About' });

      expect(about).toBeInTheDocument();

      const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

      expect(favoritePokemons).toBeInTheDocument();
    });

    test('Testa se ao clicar em Home renderiza a Página inicial', () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'Home' }));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test('Testa se ao clicar em About renderiza a página About', () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'About' }));
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test('Testa se ao clicar em Favorite Pokémons renderiza a página Favorites', () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    test('Testa se ao acessar uma URL que não existe, renderiza PageNotFound', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/erro-404');
      const { pathname } = history.location;
      expect(pathname).toBe('/erro-404');
      const notFound = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );
      expect(notFound).toBeInTheDocument();
    });
  });
