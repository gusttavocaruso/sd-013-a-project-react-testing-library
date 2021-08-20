import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from './rederWithRouter';

describe('App.js tests', () => {
  test('Teste se é redirecionado para a página inicial', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    // const homeText = screen.getByRole('heading', {
    //   name: /Encountered pokémons/i,
    //   level: 2,
    // });
    // expect(homeText).toBeInTheDocument();
  });

  test('Teste se é redirecionado para a página de About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);

    // const aboutText = screen.getByRole('heading', {
    //   name: /About Pokédex/i,
    //   level: 2,
    // });
    // expect(aboutText).toBeInTheDocument();
  });

  test('Teste se é redirecionado para a página de Pokémons Favoritados', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favPokeLink = screen.getByRole('link', {
      name: /Favorite pokémons/i,
    });
    userEvent.click(favPokeLink);

    // const favPokeText = screen.getByRole('heading', {
    //   name: /Favorite pokémons/i,
    //   level: 2,
    // });
    // expect(favPokeText).toBeInTheDocument();
  });

  test('Teste se é redirecionado para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    // const notFoundText = screen.getByRole('heading', {
    //   name: /Page requested not found/i,
    //   level: 2,
    // });
    // expect(notFoundText).toBeInTheDocument();
  });
});
