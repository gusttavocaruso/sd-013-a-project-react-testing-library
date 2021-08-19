import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

/*  Passos a verificar com testes em React:
  1 - Acessar os Elementos renderizados na tela;
  2 - Interagir com eles caso haja necessidade;
  3 - Fazer o teste; */

describe('Teste se o topo da aplicação contém links de navegação.', () => {
  test('Os links devem possuir o texto Home, About e Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/ });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: /About/ });
    expect(about).toBeInTheDocument();
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('Testa se o path / é redirecionado para Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/ });
    userEvent.click(home);
  });
  test('Testa se o path /about é redirecionado para About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/ });
    userEvent.click(about);
  });
  test('Testa se o path /favorites é redirecionado para Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
    userEvent.click(favoritePokemons);
  });
  test('Testa se com o path /pokedex é redirecionado para pagína Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokedex');
  });
});
