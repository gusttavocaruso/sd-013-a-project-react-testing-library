import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Se o primeiro link possui o texto "Home"',
    'e se ao clicar a aplicação é redirecionada para a url "/"', () => {
      const { history } = renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeDefined();

      userEvent.click(home);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  test('Verifica se o segundo link possui o texto "About"',
    'e se ao clicar a aplicação é redirecionada para a url "/about"', () => {
      const { history } = renderWithRouter(<App />);

      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeDefined();

      userEvent.click(about);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  test('Verifica se o terceiro link possui o texto "Favorite Pokémons"',
    'e se ao clicar a aplicação é redirecionada para a url "/favorites"', () => {
      const { history } = renderWithRouter(<App />);

      const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(favorites).toBeDefined();

      userEvent.click(favorites);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('Verifica se a aplicação é redirecionada para a página "Not Found"',
    'ao entrar em uma URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/qualquer-caminho');

      const notFound = screen.getByText('Page requested not found');
      expect(notFound).toBeDefined();
    });
});
