import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a App.js.', () => {
  test('Testa se renderiza os links Home, About e Favorite pokemon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });
});

describe('Verifica as rotas do App.js.', () => {
  test('Verifica se, ao clicar em home, retorna à página inicial.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    const localPage = history.location.pathname;
    expect(localPage).toStrictEqual('/');
  });
  test('Verifica se, ao clicar em About, renderiza a página About.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });

    fireEvent.click(aboutLink);
    const localPage = history.location.pathname;
    expect(localPage).toStrictEqual('/about');
  });
  test('Verifica se, ao clicar em Favorite, renderiza a página Favorites.', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favoriteLink);
    const actualPage = history.location.pathname;
    expect(actualPage).toBe('/favorites');
  });
  test('Verifica que, ao receber URL inválida, retorna NotFound.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/invalidCupcake');
    const headingInvalid = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(headingInvalid).toBeInTheDocument();
  });
});
