import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

describe('Testando o conjunto fixo de links de navegação', () => {
  test('Deve possuir uma tag h1 com o texto "Pokédex"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const h1Text = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });

    expect(h1Text).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto "Home"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const homeText = screen.getByText(/home/i);

    expect(homeText).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto "About"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const aboutText = screen.getByText(/about/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favoriteText = screen.getByText(/favorite pokémons/i);

    expect(favoriteText).toBeInTheDocument();
  });
});
