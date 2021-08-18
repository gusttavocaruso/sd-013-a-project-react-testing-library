import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
  it('Verifica se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const searchHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(searchHome).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const searchAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(searchAbout).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const searchFavoritePokémons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(searchFavoritePokémons).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /home/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se Teste se a aplicação é redirecionada para a URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /About/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se Teste se a aplicação é redirecionada para a URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Not-Found/');
    const notFound = screen.getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
