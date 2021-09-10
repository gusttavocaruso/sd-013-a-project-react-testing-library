import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1.1 - Verificando Existência de Links em <App />', () => {
  // reinicia a renderização do App antes de cada teste
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
  // Antes de cada teste, reseta a renderização e o history de App
  let navHistory;
  beforeEach(() => {
    navHistory = renderWithRouter(<App />).history;
  });

  it('Verifica se ao clicar em "Home" redireciona a aplicação '
     + 'para a Home do sistema', () => {
    const linkToHome = screen.getByRole('link', { name: 'Home' });
    expect(linkToHome).toBeInTheDocument();

    // Acima identificamos o link desejado na tela e abaixo clicamos nele e verificamos, pelo history se estamos no pathname desejado
    fireEvent.click(linkToHome);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/');
  });

  it('Verifica se ao clicar em "About" redireciona a aplicação para página About', () => {
    const linkToAbout = screen.getByRole('link', { name: 'About' });
    expect(linkToAbout).toBeInTheDocument();

    // Acima identificamos o link desejado na tela e abaixo clicamos nele e verificamos, pelo history se estamos no pathname desejado
    fireEvent.click(linkToAbout);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/about');
  });

  it('Verifica se ao clicar em "Favorite Pokémons"'
     + ' redireciona a aplicação para página Favorite Pokémons', () => {
    const linkToFavoritPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkToFavoritPokemons).toBeInTheDocument();

    // Acima identificamos o link desejado na tela e abaixo clicamos nele e verificamos, pelo history se estamos no pathname desejado
    fireEvent.click(linkToFavoritPokemons);
    const urlAtual = navHistory.location.pathname;
    expect(urlAtual).toStrictEqual('/favorites');
  });

  it('Verifica se ao entrar com uma URL desconhecida '
     + 'Redireciona a aplicação para a página Not Found', () => {
    navHistory.push('/uma-url-qualquer');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
