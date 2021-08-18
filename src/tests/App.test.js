import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testes para componente App', () => {
  it('Os link deve possuir o texto Home, About e Favorite Pokemons', () => {
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
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const textPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(textPokedex).toBeInTheDocument();
  });
  it('Testa se com a /about é redirecionado para About', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const textAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();
  });
  it('Testa se com a /favorites é redirecionado para Favorites Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
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
