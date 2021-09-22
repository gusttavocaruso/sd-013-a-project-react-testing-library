import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa Home', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('deve renderizar o componente Home', () => {
    const home = screen.getByText(/Home/);
    expect(home).toBeInTheDocument();
  });

  it('testa o link "Home" se direciona para "/"', () => {
    const home = screen.getByText(/Home/);
    expect(home.getAttribute('href')).toBe('/');
  });
});

describe('Testa About', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('deve renderizar o componente About', () => {
    const about = screen.getByText(/About/);
    expect(about).toBeInTheDocument();
  });

  it('testa o link "About" se direciona para "/about"', () => {
    const about = screen.getByText(/About/);
    expect(about.getAttribute('href')).toBe('/about');
  });
});

describe('Testa Favorites', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('deve renderizar o componente Favorites', () => {
    const favorite = screen.getByText(/Favorite Pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  it('testa o link "Favorite Pokémons" se direciona para "/favorites"', () => {
    const favorite = screen.getByText(/Favorite Pokémons/);
    expect(favorite.getAttribute('href')).toBe('/favorites');
  });
});

// a feito com consulta ao repositório https://github.com/tryber/sd-013-a-project-react-testing-library/tree/f38b7d9fd1a21c803077a1221844aeb6051f49dd/src/tests
