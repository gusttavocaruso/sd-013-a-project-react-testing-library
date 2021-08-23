import React from 'react';
import { screen } from '@testing-library/react';
// Aqui importamos o Evento do usuário
import userEvent from '@testing-library/user-event';
// Aqui importamos o componente que iremos testar
import App from '../App';
// Aqui importamos a helper
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Verificando Existência de Links em <App.js />', () => {
  test('Verifica a existência um Link com o texto "Home"', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByText('Home');
    expect(linkToHome).toBeInTheDocument();
  });

  test('Verifica a existência um Link com o texto "About"', () => {
    renderWithRouter(<App />);
    const linkToAbout = screen.getByText('About');
    expect(linkToAbout).toBeInTheDocument();
  });

  test('Verifica a existência um Link com o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByText('Favorite Pokémons');
    expect(linkToFavorite).toBeInTheDocument();
  });
});

describe('Requisito 1 - Verificando se os links são redirecionados', () => {
  test('testando a rota Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByText('Home');
    userEvent.click(linkToHome);

    // Com history.location.pathname verificamos se estamos na página certa
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    // Verificamos se o texto que aparece quando clica-se neste link, é renderizado corretamente
    const hometAll = screen.getByText('Encountered pokémons');
    expect(hometAll).toBeInTheDocument();
  });

  test('testando a rota about', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByText('About');
    userEvent.click(linkToAbout);

    // Com history.location.pathname verificamos se estamos na página certa
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    // Verificamos se o texto que aparece quando clica-se neste link, é renderizado corretamente
    const aboutAll = screen.getByText('About Pokédex');
    expect(aboutAll).toBeInTheDocument();
  });

  test('testando a rota favorites', () => {
    const { history } = renderWithRouter(<App />);

    const linkTofavorites = screen.getByText('Favorite Pokémons');
    userEvent.click(linkTofavorites);

    // Com history.location.pathname verificamos se estamos na página certa
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    // Verificamos se o texto que aparece quando clica-se neste link, é renderizado corretamente
    const favoritesAll = screen.getByText('Favorite pokémons');
    expect(favoritesAll).toBeInTheDocument();
  });
});
