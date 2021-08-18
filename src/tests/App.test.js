import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste de do component App.js', () => {
  test('Teste do conjunto fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // O primeiro link deve possuir o texto `Home`.
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();

    // - O segundo link deve possuir o texto `About`.
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();

    // - O terceiro link deve possuir o texto `Favorite Pokémons`.
    const favoritePokemons = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('Teste de redirecionamentos', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    // Teste se a aplicação é redirecionada para a página inicial, na URL `/` ao clicar no link `Home` da barra de navegação
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const titleHome = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(titleHome).toBeInTheDocument();

    // - Teste se a aplicação é redirecionada para a página de `About`, na URL `/about`, ao clicar no link `About` da barra de navegação.
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);

    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titleAbout).toBeInTheDocument();
    // - Teste se a aplicação é redirecionada para a página de `Pokémons Favoritados`, na URL `/favorites`, ao clicar no link `Favorite Pokémons` da barra de navegação.
    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);

    const titleFavorites = screen.getByRole('heading', {
      name: /favorite/i,
      level: 2,
    });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('Teste de página não encontrada', () => {
    //   - Teste se a aplicação é redirecionada para a página `Not Found` ao entrar em uma URL desconhecida.
    const { history } = renderWithRouter(<App />);
    history.push('/rota-inexistente');
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found /i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
