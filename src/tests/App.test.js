import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
    RenderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(getLinkHome);
    expect(getLinkHome).toBeInTheDocument();

    const getLinkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(getLinkAbout);
    expect(getLinkAbout).toBeInTheDocument();

    const getLinkFavPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(getLinkFavPokemons);
    expect(getLinkFavPokemons).toBeInTheDocument();
  });

  test('Testa se ao clicar nos Links de navegação eles vão para o path certo', () => {
    const { history } = RenderWithRouter(<App />);

    const getLinkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(getLinkHome);
    const pathnameHome = history.location.pathname;
    expect(pathnameHome).toBe('/');

    const getLinkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(getLinkAbout);
    const pathnameAbout = history.location.pathname;
    expect(pathnameAbout).toBe('/about');

    const getLinkFavPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(getLinkFavPokemons);
    const pathnameFavPokemons = history.location.pathname;
    expect(pathnameFavPokemons).toBe('/favorites');
  });
});
