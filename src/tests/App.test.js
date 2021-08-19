import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App.js Test', () => {
  test('Aplicação contém links de navegação', () => {
    renderWithRouter(<App />);

    const navLinks = screen.getAllByRole('link');

    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('Aplicação redireciona para "Home" com sucesso', () => {
    const { history } = renderWithRouter(<App />);
    const homeBtn = screen.getByText(/home/i);
    const { pathname } = history.location;
    userEvent.click(homeBtn);

    expect(pathname).toBe('/');
  });

  test('Aplicação redireciona para "About" com sucesso', () => {
    const { history } = renderWithRouter(<App />);
    const aboutBtn = screen.getByText(/about/i);
    userEvent.click(aboutBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Aplicação redireciona para "Favorite Pokémons" com sucesso', () => {
    const { history } = renderWithRouter(<App />);
    const favBtn = screen.getByText(/favorite pokémons/i);
    userEvent.click(favBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Aplicação rediciona para "PageNotFound" com sucesso', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unkwon-url');
    const notFound = screen.getByText(/not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
