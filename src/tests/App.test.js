import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  describe('Testar se a aplicação contém um conjunto fixo de links de navegação.', () => {
    it('O primeiro link deve possuir o texto Home.', () => {
      RenderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /Home/i });
      expect(linkHome).toBeInTheDocument();
    });

    it('O segundo link deve possuir About.', () => {
      RenderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /About/i });
      expect(linkAbout).toBeInTheDocument();
    });

    it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      RenderWithRouter(<App />);
      const linkFavoritePokemons = screen
        .getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkFavoritePokemons).toBeInTheDocument();
    });
  });

  describe('Testar as Rotas da aplicação.', () => {
    it('Clicar no link Home redireciona para rota "/".', () => {
      const { history } = RenderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /Home/i }));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

    it('Clicar no link About redireciona para rota "/about".', () => {
      const { history } = RenderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /About/i }));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

    it('Clicar no link Favorite Pokémons redireciona para rota "/favorites".', () => {
      const { history } = RenderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

    it('Aplicação renderiza a pagina "Not Found" ao digitar URL desconhecida', () => {
      const { history } = RenderWithRouter(<App />);
      history.push('/trybe');
      const notFound = screen.queryByText(/not found/i);
      expect(notFound).toBeInTheDocument();
    });
  });
});
