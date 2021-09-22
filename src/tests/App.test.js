import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../components';
import App from '../App';

describe('1- Testa o componente App.js', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('A aplicação é redirecionada corretamente ao clicar nos links.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
});

test('', () => {});
