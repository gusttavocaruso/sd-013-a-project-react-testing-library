import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Testa se o topo da aplicação
  contém um conjunto fixo de links de navegação`, () => {
  it('Verifica se existe os 3 links fixos na navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it(`Verifica se a aplicação é redirecionada para a página
  inicial, na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Verifica se a aplicação é redirecionada para a página de
  About, na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados, na
  URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Verifica se a aplicação é redirecionada para
  a página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota/não-encontrada');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
