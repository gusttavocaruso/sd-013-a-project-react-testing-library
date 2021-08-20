import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App.js tests', () => {
  test('Renderiza Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    const homeText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(homeText).toBeInTheDocument();
  });

  test('Renderiza About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);

    const aboutText = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Renderiza Favorite Pokémons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favPokeLink = screen.getByRole('link', {
      name: /Favorite pokémons/i,
    });
    userEvent.click(favPokeLink);

    const favPokeText = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(favPokeText).toBeInTheDocument();
  });

  test('Renderiza Not Found', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
