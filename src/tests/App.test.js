import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Se o primeiro link possui o texto "Home" e redireciona para a URL certa',
    () => {
      const { history } = renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeDefined();

      userEvent.click(home);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  it('Se o link possui o texto "About" e se ao clicar é redirecionada para a URL certa',
    () => {
      const { history } = renderWithRouter(<App />);

      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeDefined();

      userEvent.click(about);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  it('Se o link possui "Favorite Pokémons" e ao clicar é redirecionada para a URL certa',
    () => {
      const { history } = renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favorites).toBeDefined();

      userEvent.click(favorites);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  it('Se é redirecionada para a página "Not Found" ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/qualquer-caminho');

      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeDefined();
    });
});
