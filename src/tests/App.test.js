import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o App.js', () => {
  test('Testar se o link com o texto "Home" redireciona para a rota "/" ', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', {
      name: /home/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testar se o link com o texto "About" redireciona para a rota "/about" ', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', {
      name: /about/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testar o link com texto "Favorite Pokemóns" direciona para "/favorites" ', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', {
      name: /favorite/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
