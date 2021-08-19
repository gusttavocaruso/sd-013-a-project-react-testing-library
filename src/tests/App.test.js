import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa app.js, se há links e se redirecionam para a página correta', () => {
  test('O link deve possuir o texto Home e redirecionar para URL /', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('O link deve possuir o texto About e redirecionar para URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('O link deve possuir o texto Favorite Pokémons e redirecionar para URL /favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavoritePokemons = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });
      expect(linkFavoritePokemons).toBeInTheDocument();
      userEvent.click(linkFavoritePokemons);
      expect(history.location.pathname).toBe('/favorites');
    });

  test('A aplicação é redirecionada para a página Not Found para uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/rota-que-não-existe');
      const pageNotFound = screen.getByText('Page requested not found');
      expect(pageNotFound).toBeInTheDocument();
    });
});
