import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  test('se o app redireciona para "/" ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByText(/home/i);
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('se o app redireciona para "/about" ao clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByText(/about/i);
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('se o app redireciona para "/favorites" ao clicar em "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByText(/favorite pokémons/i);
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('se o app redireciona para PageNotFound ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const page = screen.getByText(/not found/i);
    expect(page).toBeInTheDocument();
  });
});
