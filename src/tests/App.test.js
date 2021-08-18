import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
const home = screen.getByText('Home');
const about = screen.getByText('About');
const favorite = screen.getByText('Favorite Pokémons');

describe('Testa o link Home', () => {
  it('Testa se o link "Home" possui o texto "Home"', () => {
    expect(home.textContent).toBe('Home');
  });
  it('Testa se o link "Home" direciona para "/"', () => {
    expect(home.getAttribute('href')).toBe('/');
  });
});

describe('Testa o link About', () => {
  it('Testa se o link "About" possui o texto "About"', () => {
    expect(about.textContent).toBe('About');
  });
  it('Testa se o link "About" direciona para "/about"', () => {
    expect(about.getAttribute('href')).toBe('/about');
  });
});

describe('Testa o link Favorite Pokémons', () => {
  it('Testa se o link "favorites" possui o texto "Favorite Pokémons"', () => {
    expect(favorite.textContent).toBe('Favorite Pokémons');
  });
  it('Testa se o link "favorites" direciona para "/favorites"', () => {
    expect(favorite.getAttribute('href')).toBe('/favorites');
  });
});
