import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../App';

describe('Verifica se a aplicação contém um conjunto fixo de links de navegação.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('O primeiro link deve possuir o texto Home.', () => {
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About.', () => {
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const favoritePokémonsLink = screen.getByText('Favorite Pokémons');
    expect(favoritePokémonsLink).toBeInTheDocument();
  });
});

describe('Verifica funcionamento dos links', () => {
  let historico;
  beforeEach(() => {
    historico = renderWithRouter(<App />).history;
  });
  it('Redireciona para a página inicial, na URL / ao clicar no link Home.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    const url = historico.location.pathname;
    expect(url).toStrictEqual('/');
  });

  it('Redireciona para a página de About, na URL /about, ao clicar no link About', () => {
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    const url = historico.location.pathname;
    expect(url).toStrictEqual('/about');
  });

  it('Redireciona para a URL /favorites,ao clicar no Favorite Pokémons', () => {
    const favoritePokémonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokémonsLink).toBeInTheDocument();
    fireEvent.click(favoritePokémonsLink);
    const url = historico.location.pathname;
    expect(url).toStrictEqual('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    historico.push('/url-desconhecida');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
