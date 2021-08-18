import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { from } from 'array-flatten';
import React from 'react';
// import testUtils from 'react-dom/test-utils';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App.js tests', () => {
  test('testa se o primeiro link possui texto Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkText = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkText);
    expect(linkText).toBeInTheDocument();
  });

  test('testa se o segundo link possui texto About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkText = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkText);
    expect(linkText).toBeInTheDocument();
  });

  test('testa se o terceiro link possui texto favorite pokémons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkText = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkText);
    expect(linkText).toBeInTheDocument();
  });
});

describe('App.js pagina nao encontrada', () => {
  test('renderiza mensagem de página não encontrada', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <App />
      </Router>,
    );

    historyMock.push('/nao-existe');

    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
