import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa Home, About, Favorite', () => {
  test('Testa se existe o link para Home, About, Favorite', () => {
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

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    const homeRedirect = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(homeRedirect).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);

    const aboutRedirect = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutRedirect).toBeInTheDocument();

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
  const historyMock = createMemoryHistory();

  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  historyMock.push('/rota-inexistente');

  const pageNFound = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });

  expect(pageNFound).toBeInTheDocument();
});
