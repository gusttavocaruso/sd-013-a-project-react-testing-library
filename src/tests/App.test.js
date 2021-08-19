import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../types/renderWithRouter';

describe('Testa Home, About, Favorite', () => {
  test('Testa se existe o link para Home, About, Favorite', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Testa a existência do Link Home
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    // Testa a existência do Link About
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    // Testa a existência do Link Favorite Pokémon
    const favPokeLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favPokeLink).toBeInTheDocument();
  });

  test('Testa redirecionamento dos links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Testa o redirecionamento para Home
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    const homeRedirect = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(homeRedirect).toBeInTheDocument();

    // Testa o redirecionamento para About
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);

    const aboutRedirect = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutRedirect).toBeInTheDocument();

    // Testa o redirecionamento para Favorite Pokémon
    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favLink);

    const favRedirect = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(favRedirect).toBeInTheDocument();
  });
});

test(('Testa redirecionamento da Page Not Found'), () => {
  const { history } = renderWithRouter(<App />);

  history.push('/rota-inexistente');

  const pageNFound = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });

  expect(pageNFound).toBeInTheDocument();
});
