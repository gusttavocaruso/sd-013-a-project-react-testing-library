import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFav = screen.getByRole('link', {
      name: /favorite/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFav).toBeInTheDocument();
  });

  test('Teste ao clicar, redireciona para página inicial ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const homeHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(homeHeading).toBeInTheDocument();
  });

  test('Test se redirecionada para page About, clicando no link About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pathname).toBe('/about');
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Test se redirecionada para page Favoritados, clicando no link favorites', () => {
    const { history } = renderWithRouter(<App />);

    const linkFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFav).toBeInTheDocument();

    userEvent.click(linkFav);

    const { pathname } = history.location;
    const favHeading = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(pathname).toBe('/favorites');
    expect(favHeading).toBeInTheDocument();
  });

  test('Teste se é redirecionada para a page Not Found.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/digimon');

    const { pathname } = history.location;
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(pathname).toBe('/digimon');
    expect(notFound).toBeInTheDocument();
  });
});
