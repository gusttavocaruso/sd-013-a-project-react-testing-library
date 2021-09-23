import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Requisito 1 - App.js', () => {
  test('Verifica se renderiza o link "Home" e funciona rota', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    const strHeadingHome = screen.getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(strHeadingHome).toBeInTheDocument();
  });

  test('Verifica se renderiza o link "About" e funciona rota', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/about/i)).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);

    const strHeadingAbout = screen.getByRole('heading', {
      name: /about/i,
      level: 2,
      exact: false,
    });
    expect(strHeadingAbout).toBeInTheDocument();
  });

  test('Verifica se renderiza o link "Favorite Pokemons" e funciona rota', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByText(/favorite/i)).toBeInTheDocument();

    const linkFavPokemons = screen.getByRole('link', {
      name: /favorite/i,
      exact: false,
    });
    userEvent.click(linkFavPokemons);

    const strHeadingFavPokemons = screen.getByRole('heading', {
      name: /favorite/i,
      level: 2,
      exact: false,
    });
    expect(strHeadingFavPokemons).toBeInTheDocument();
  });

  test('Verifica se renderiza página não encontrada', () => {
    const historyMock = createMemoryHistory();
    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/rota-que-nao-existe');

    const strHeadingNotFound = screen.getByRole('heading', {
      name: /not found/i,
      level: 2,
      exact: false,
    });
    expect(strHeadingNotFound).toBeInTheDocument();
  });
});
