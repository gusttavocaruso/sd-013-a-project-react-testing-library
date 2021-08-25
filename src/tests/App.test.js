import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Requisito 1-1 - Testa links fixos do topo do <App />', () => {
  beforeEach(() => {
    RenderWithRouter(<App />);
  });

  test('Testa se existe um Link contendo o texto "Home"', () => {
    const routeHome = screen.getByText('Home');
    expect(routeHome).toBeInTheDocument();
  });

  test('Testa se existe um Link contendo o texto "About"', () => {
    const routeAbout = screen.getByText('About');
    expect(routeAbout).toBeInTheDocument();
  });

  test('Testa se existe um Link contendo o texto "Favorite Pokémons"', () => {
    const routeFavoritePokemons = screen.getByText('Favorite Pokémons');
    expect(routeFavoritePokemons).toBeInTheDocument();
  });
});

describe('Requisito 1-2 - Testa as rota dos links em <App />', () => {
  let navegation;
  beforeEach(() => {
    navegation = RenderWithRouter(<App />).getHistory;
  });

  test('Testa se ao clicar em "Home" é redirecionada para pagina principal', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    fireEvent.click(linkHome);
    const url = navegation.location.pathname;
    expect(url).toStrictEqual('/');
  });

  test('Testa se ao clicar em "About" é redirecionada para pagina de About', () => {
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);
    const url = navegation.location.pathname;
    expect(url).toStrictEqual('/about');
  });

  test('Testa se ao clicar em "Pokémons Favoritados" é redirecionada'
    + 'para pagina de Favorite Pokémons', () => {
    const linkFavoritPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavoritPokemons).toBeInTheDocument();

    fireEvent.click(linkFavoritPokemons);
    const url = navegation.location.pathname;
    expect(url).toStrictEqual('/favorites');
  });

  it('Testa se o redirecionamento da página "Not Found" ao entrar em uma'
    + 'URL desconhecida ', () => {
    navegation.push('/uma-url-qualquer'); // Essa resolução foi baseada na aula.
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
}); // Resolução baseada no projedo do Matheus Duarte.
