import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testes para componente App', () => {
  it('Os links devem possuir o texto Home, About e Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link',
      { name: /Home/ });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link',
      { name: /About/ });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link',
      { name: /Favorite Pokémons/ });
    expect(favorite).toBeInTheDocument();
  });
  it('Testa se com a / é redirecionado para Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link',
      { name: /Home/ });
    userEvent.click(home);
    const textPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(textPokedex).toBeInTheDocument();
  });
  it('Testa se com a /about é redirecionado para About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link',
      { name: /About/ });
    userEvent.click(about);
    const textAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();
  });
  it('Testa se com a /favorites é redirecionado para Favorites Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link',
      { name: /Favorite Pokémons/ });
    userEvent.click(favorite);
    const textFavorite = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(textFavorite).toBeInTheDocument();
  });
  it('Testa se com a /xablau é redirecionado para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const textNotFound = screen.getByRole('heading', {
      name: /Page requested not found /i,
      level: 2,
    });
    expect(textNotFound).toBeInTheDocument();
  });
});
