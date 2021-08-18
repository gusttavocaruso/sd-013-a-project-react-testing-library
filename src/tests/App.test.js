import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App.js tests', () => {
  test('O topo da aplicação possui um conjuto fixo de links em ordem', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('Aplicação redireciona p/ a página inicial ao clicar "Home"', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/');

    const renderizaHome = screen.getByRole('heading', {
      name: /pokédex/i,
    });
    expect(renderizaHome).toBeInTheDocument();
  });

  test('Aplicação é redirecionada para URL/about ao clicar "About"', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/about');

    const renderizaAbout = screen.getByRole('img');
    expect(renderizaAbout).toBeInTheDocument();
  });

  test('Aplicação redireciona p/ URL/favorites ao clicar "Favorites Pokémons"', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/favorites');

    const renderizaFavorites = screen.getByRole('heading', {
      name: /favorite pokémons/i,
    });
    expect(renderizaFavorites).toBeInTheDocument();
  });

  test('Aplicação redireciona para a página Not Found com URL desconhecida', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/rota-desconhecida');

    const renderizaFavorites = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(renderizaFavorites).toBeInTheDocument();
  });
});
