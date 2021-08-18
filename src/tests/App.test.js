import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

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
});
