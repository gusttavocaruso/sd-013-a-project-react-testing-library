import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('Testa se os links existem e funcionam', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const home = screen.getByRole('link', {
        name: /home/i,
      });
      const about = screen.getByRole('link', {
        name: /about/i,
      });
      const favoritePokemons = screen.getByRole('link', {
        name: /favorite pokémons/i,
      });
      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemons).toBeInTheDocument();

      userEvent.click(home);
      const homeText = screen.getByRole('heading', {
        name: /encountered pokémons/i,
        level: 2,
      });
      expect(homeText).toBeInTheDocument();

      userEvent.click(about);
      const aboutText = screen.getByRole('heading', {
        name: /about pokédex/i,
        level: 2,
      });
      expect(aboutText).toBeInTheDocument();

      userEvent.click(favoritePokemons);
      const favoriteText = screen.getByRole('heading', {
        name: /favorite pokémons/i,
        level: 2,
      });
      expect(favoriteText).toBeInTheDocument();
    });
    test('Testa se ao acessar URL que não existe rendiza página não encontrada.', () => {
      const historyMock = createMemoryHistory();
      render(
        <Router history={ historyMock }>
          <App />
        </Router>,
      );
      historyMock.push('/erro-404');

      const notFoundText = screen.getByRole('heading', {
        name: /page requested not found/i,
        level: 2,
      });
      expect(notFoundText).toBeInTheDocument();
    });
  });
