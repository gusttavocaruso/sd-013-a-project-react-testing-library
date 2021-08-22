import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa o componente App', () => {
  test('testa se os links Home, About e Favorite pokemóns são renderizados', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favPokesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokesLink).toBeInTheDocument();
  });

  test('testa se somos direcionados ao "/" ao clicar em home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    /* const aboutLink = screen.getByRole('link', { name: /About/i });
    const favPokesLink = screen.getByRole('link', { name: /Favorite Pokémons/i }); */

    fireEvent.click(homeLink); // dispara um click no nosso Home;
    const { pathname } = history.location; // usamos o pathname para saber em qual lugar do '/' estamos;
    expect(pathname).toBe('/'); // esperamos que estejamos no '/' após clicar no Home
  });
  test('testa se somos direcionados ao "/about" ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });

    fireEvent.click(aboutLink); // dispara um click no nosso Home;
    const { pathname } = history.location; // usamos o pathname para saber em qual lugar do '/' estamos;
    expect(pathname).toBe('/about');
  });

  test('testa se somos direcionados ao "/favorites" ao clicar em Pokemons Favs', () => {
    const { history } = renderWithRouter(<App />);

    const favPokesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    fireEvent.click(favPokesLink); // dispara um click no nosso Home;
    const { pathname } = history.location; // usamos o pathname para saber em qual lugar do '/' estamos;
    expect(pathname).toBe('/favorites');
  });

  test('testa se somos direcionados a uma Page not Found caso o link não exista', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/banana');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
