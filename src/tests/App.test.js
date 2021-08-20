import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se a aplicação redireciona para a URL correta', () => {
  test('URL "/" for Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  test('URL "/about" for About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
  });

  test('URL "/favorites" for Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorites).toBeInTheDocument();
  });
});

describe('Testa os clicks para redirecionamento funcionam corretamente', () => {
  test('Click URL "/" for Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toEqual('/');
  });

  test('Click URL "/about" for About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toEqual('/about');
  });

  test('Click URL "/favorites" for Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    expect(history.location.pathname).toEqual('/favorites');
  });
});
