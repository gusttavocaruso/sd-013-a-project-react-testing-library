import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testando o component App', () => {
  it('O link "Home" leva para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();

    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O link "About" leva para página sobre', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('O link "Favorite Pokémons" leva para página de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByText('Favorite Pokémons');
    expect(linkFavorite).toBeInTheDocument();

    fireEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
