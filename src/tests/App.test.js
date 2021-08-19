import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste da aplicação de links', () => {
  test('testa o link home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('testa o link about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('testa o link Favorites Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const linkfavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkfavorites).toBeInTheDocument();
    userEvent.click(linkfavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found,'
    + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/2222');
    const notFount = screen.getByRole(
      'img', { name: 'Pikachu crying because the page requested was not found' },
    );
    expect(notFount).toBeInTheDocument();
  });
});
