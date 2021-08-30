import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App', () => {
  it('verifica os links', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('Teste das rotas', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);

    const titleHome = screen.getByRole('heading', {
      name: /pokédex/i,
    });
    expect(titleHome).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);

    const titleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(titleAbout).toBeInTheDocument();

    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);

    const titleFavorites = screen.getByRole('heading', {
      name: /favorite/i,
    });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('testa página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-qualquer');
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found /i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});

// 1. Teste o componente `<App.js />`
// - Teste se o topo da aplicação contém um conjunto fixo de links de navegação.
// - O primeiro link deve possuir o texto `Home`.
// - O segundo link deve possuir o texto `About`.
// - O terceiro link deve possuir o texto `Favorite Pokémons`.
// - Teste se a aplicação é redirecionada para a página inicial, na URL `/` ao clicar no link `Home` da barra de navegação.
// - Teste se a aplicação é redirecionada para a página de `About`, na URL `/about`, ao clicar no link `About` da barra de navegação.
// - Teste se a aplicação é redirecionada para a página de `Pokémons Favoritados`, na URL `/favorites`, ao clicar no link `Favorite Pokémons` da barra de navegação.
// - Teste se a aplicação é redirecionada para a página `Not Found` ao entrar em uma URL desconhecida.
//* *O que será verificado:**
// - Será avaliado se o arquivo teste `App.test.js` contemplam 100% dos casos de uso criados pelo Stryker.
