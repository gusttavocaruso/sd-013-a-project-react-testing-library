import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa os componentes do App', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();
  });
  it('Teste se é redirecionada para a pág inicial, na URL / ao clicar no Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    userEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(history.location.pathname).toBe('/');
  });
  it('Teste se é redirecionada para a pág About, na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    userEvent.click(screen.getByRole('link', { name: /About/i }));
    expect(history.location.pathname).toBe('/about');
  });
  it('Teste se é redirecionada para a pág FavPoke, na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Teste se é redirect para a pág NotFound ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    expect(history.location.pathname).toBe('/not-found');
  });
});
