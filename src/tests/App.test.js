import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto de links de navegação', () => {
  it('O primeiro link deve possuir o texto "Home"', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByRole('link', {
      name: /home/i,
    });

    expect(homeText).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const aboutText = screen.getByRole('link', {
      name: /about/i,
    });

    expect(aboutText).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favoritePokemonText = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(favoritePokemonText).toBeInTheDocument();
  });
});

describe('Testa rotas', () => {
  it('Deveria redirecionar para a página inicial, "/", quando clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const homeText = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeText);

    const { location } = history;
    const { pathname } = location;
    const homePathname = pathname;

    expect(homePathname).toBe('/');
  });

  it('Deveria redirecionar para a página "/about" quando clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutText = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutText);

    const { location } = history;
    const { pathname } = location;
    const aboutPathname = pathname;

    expect(aboutPathname).toBe('/about');
  });

  it('Deveria redirecionar para página "/favorites" quando clica em "Favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteText = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favoriteText);

    const { location } = history;
    const { pathname } = location;
    const favoritePathname = pathname;

    expect(favoritePathname).toBe('/favorites');
  });

  it('Deveria redirecionar para página "Not Fount" quando "/qualquer-coisa"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/qualquer-coisa');

    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
