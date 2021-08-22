import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1.1 - Verificando Existência de Links em <App />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica a existência um Link com o texto "Home"', () => {
    const linkToHome = screen.getByText('Home');
    expect(linkToHome).toBeInTheDocument();
  });

  it('Verifica a existência um Link com o texto "About"', () => {
    const linkToAbout = screen.getByText('About');
    expect(linkToAbout).toBeInTheDocument();
  });

  it('Verifica a existência um Link com o texto "Favorite Pokémons"', () => {
    const linkToFavoritePokemons = screen.getByText('Favorite Pokémons');
    expect(linkToFavoritePokemons).toBeInTheDocument();
  });
});

describe('Requisito 1.2 - Verificando o comportamento dos links em <App />', () => {
  let navHistory;
  beforeEach(() => {
    navHistory = renderWithRouter(<App />).history;
  });

  it('Ao clicar em "Home" redireciona para a Home', () => {
    const linkToHome = screen.getByRole('link', { name: 'Home' });
    expect(linkToHome).toBeInTheDocument();

    fireEvent.click(linkToHome);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/');
  });

  it('Ao clicar em "About" redireciona para About', () => {
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    expect(linkToAbout).toBeInTheDocument();

    fireEvent.click(linkToAbout);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/about');
  });

  it('Ao clicar em "Favorite Pokémons" redireciona para Favorite Pokémons', () => {
    const linkToFavoritPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkToFavoritPokemons).toBeInTheDocument();

    fireEvent.click(linkToFavoritPokemons);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/favorites');
  });

  it('Redireciona para a Not Found ao entrar com uma URL desconhecida.', () => {
    navHistory.push('/uma-url-qualquer');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
