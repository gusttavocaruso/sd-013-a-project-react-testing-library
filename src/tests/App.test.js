import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Renderiza o link "Home"', () => {
    renderWithRouter(<App />);
    const homeText = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeText).toBeInTheDocument();
  });

  test('Renderiza o link "About"', () => {
    renderWithRouter(<App />);
    const aboutText = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Renderiza o link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favoritePokemonsText = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemonsText).toBeInTheDocument();
  });
});

describe('Teste o componente <App.js />', () => {
  test('Ao clicar no "Home" redireciona para "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeText = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeText);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('Ao clicar no "About" redireciona para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutText = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutText);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('Ao clicar no "Pokémons Favoritados" redireciona para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsText = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritePokemonsText);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  test('Ao entrar em url desconhecida ir para página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
