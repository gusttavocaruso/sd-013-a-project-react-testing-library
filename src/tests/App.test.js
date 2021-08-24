import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Primeiro requisito: Links de navegação', () => {
  beforeEach(() => { // antes de cada teste, a renderização é resetada.
    renderWithRouter(<App />);
  });

  it('Verifica se existe um link com o texto "Home"', () => {
    const homeLink = screen.getByText('Home'); // resgatamos o link pelo texto.
    expect(homeLink).toBeInTheDocument(); // esperamos que o link esteja na tela.
  });

  it('Verifica se existe um link com o texto "About"', () => {
    const aboutLink = screen.getByText('About'); // resgatamos o link pelo texto.
    expect(aboutLink).toBeInTheDocument(); // esperamos que o link esteja na tela.
  });

  it('Verifica se existe um link com o texto "Favorite Pokémons"', () => {
    const favoriteLink = screen.getByText('Favorite Pokémons'); // resgatamos o link pelo texto.
    expect(favoriteLink).toBeInTheDocument(); // esperamos que o link esteja na tela.
  });
});

describe('Requisito 1.2, verifica o comportamento dos links', () => {
  let navHistory;
  beforeEach(() => { // antes de cada teste, reseta a renderização e o history.
    navHistory = renderWithRouter(<App />).history; // o método <BrowserRouter /> da problema com o render() comum, pois ele armazena o histórico de navegação entre testes, deixando-os interdependentes. Esse objeto history nada mais é que um histórico customizado, que será apagado e reutilizado a cada iteração.
  });
  it('Verifica se ao clicar em "Home", somos redirecionados para a URL /', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' }); // identificamos o link desejado, puxando pelo seu papel e pelo nome atribuido a ele.
    expect(homeLink).toBeInTheDocument(); // verificamos se o link está no documento.

    fireEvent.click(homeLink); // simulamos um evento de click no link Home.
    const url = navHistory.location.pathname; // verificamos, pelo history, se estamos no pathname desejado.
    expect(url).toStrictEqual('/');
  });

  it('Verifica se ao clicar em "About", somos redirecionados para a URl /about', () => {
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(aboutLink);
    const url = navHistory.location.pathname;
    expect(url).toStrictEqual('/about');
  });

  it('Verifica se ao clicar em "Favorite Pokémons", vamos para a URl /favorites', () => {
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();

    fireEvent.click(favoriteLink);
    const url = navHistory.location.pathname;
    expect(url).toStrictEqual('/favorites');
  });

  it('Verifica se ao entrar uma URL desconhecida, vamos para pág Not Found', () => {
    navHistory.push('/uma-url-qlqr'); // com o método push, podemos simular a mudança de rotas no ambiente de testes.
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
