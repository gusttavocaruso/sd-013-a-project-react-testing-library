import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando os links no componente App', () => {
  test('Testa o link "Home"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    const homeContent = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(homeContent).toBeInTheDocument();
  });

  test('Testa o link "About"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);

    const aboutContent = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutContent).toBeInTheDocument();
  });

  test('Testa o link "Favorite Pokémons"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavoritePokemons);

    const favoriteContent = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoriteContent).toBeInTheDocument();
  });
});
