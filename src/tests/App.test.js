import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  render(<BrowserRouter><App /></BrowserRouter>);

  const home = screen.getByText(/home/i);
  expect(home).toBeInTheDocument();

  const about = screen.getByText(/about/i);
  expect(about).toBeInTheDocument();

  const favoritePokemons = screen.getByText(/favorite pokémons/i);
  expect(favoritePokemons).toBeInTheDocument();
});

test('se a aplicação é redirecionada para a página inicial ao clicar em Home', () => {
  const { history } = renderWithRouter(<App />);

  userEvent.click(screen.getByText(/about/i));
  const aboutPath = history.location.pathname;
  expect(aboutPath).toBe('/about');

  userEvent.click(screen.getByText(/home/i));
  const homePath = history.location.pathname;
  expect(homePath).toBe('/');

  expect(screen.getByText(/encountered pokémons/i)).toBeInTheDocument();
});

test('se a aplicação é redirecionada ao clicar em About', () => {
  const { history } = renderWithRouter(<App />);

  userEvent.click(screen.getByText(/favorite pokémons/i));
  const favoritesPath = history.location.pathname;
  expect(favoritesPath).toBe('/favorites');

  userEvent.click(screen.getByText(/about/i));
  const aboutPath = history.location.pathname;
  expect(aboutPath).toBe('/about');

  expect(screen.getByText(/this application simulates a Pokédex/i)).toBeInTheDocument();
});

test('se a aplicação é redirecionada ao clicar em Favorite Pokémons"', () => {
  const { history } = renderWithRouter(<App />);

  userEvent.click(screen.getByText(/about/i));
  const aboutPath = history.location.pathname;
  expect(aboutPath).toBe('/about');

  userEvent.click(screen.getByText(/favorite pokémons/i));
  const favoritesPath = history.location.pathname;
  expect(favoritesPath).toBe('/favorites');

  expect(screen.getByText(/pokédex/i)).toBeInTheDocument();
});

test('se a aplicação é redirecionada para Not Found quando não achar a rota"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/rota-que-nao-existe');

  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
