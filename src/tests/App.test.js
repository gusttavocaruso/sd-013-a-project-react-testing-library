import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <App />', () => {
  it('Verifica se existe um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Verifica se ao cliclar em "Home", a página inicial "/" é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    const homeText = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(pathname).toBe('/');
    expect(homeText).toBeInTheDocument();
  });

  it('Verifica se ao clicar em "About", a página "/about" é renderizada', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se ao clicar em "Favorite Pokémons", a página "/favorite" é renderizada',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText(/favorite pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Verifica se a página "Not Found" é renderizada ao passar uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');
      const notFoundText = screen.getByRole('heading', {
        name: /page requested not found/i,
      });
      expect(notFoundText).toBeInTheDocument();
    });
});
