import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App.js tests', () => {
  test('Renderiza conjunto de links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorite = screen.getByText('Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('os links redirecionam corretamente HOME', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
  });

  test('os links redirecionam corretamente ABOUT', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);

    const about = screen.getByText(/encyclopedia containing/i);
    expect(about).toBeInTheDocument();
  });

  test('os links redirecionam corretamente FAVORITE', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkFavorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(linkFavorite);

    const favorite = screen.getByText(/pokemon found/i);
    expect(favorite).toBeInTheDocument();
  });

  test('os links redirecionam corretamente NOT FOUND', () => {
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/rota-nao-existente');

    const pageNotFound = screen.getByText(/not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
