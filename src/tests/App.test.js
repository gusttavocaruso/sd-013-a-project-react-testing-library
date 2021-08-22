import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../helper/RenderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('se existe um conjunto fixo de links no topo do app', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
    const favorites = screen.getByText('Favorite Pokémons');
    expect(favorites).toBeInTheDocument();
  });

  test('se o app vai para "/" ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/home/i);
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se o app vai para "/about" ao clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/about/i);
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('se o app vai para "/favorites" ao clicar em "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByText(/favorite pokémons/i);
    fireEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('se o app vai para NotFound ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/error404');
    const NotFound = screen.getByText(/Page requested not found/i);
    expect(NotFound).toBeInTheDocument();
  });
});
