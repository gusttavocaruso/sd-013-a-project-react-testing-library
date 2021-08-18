import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente App', () => {
  test('1o link funciona e possui o texto "Home"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('2o link funciona e possui o texto "About"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('3o link funciona e possui o texto "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
