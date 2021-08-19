import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('1 - Testando se o topo da aplicação contém um conjunto'
+ ' fixo de links de navegação.', () => {
  it('1.1 - O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  it('1.2 - A aplicação é redirecionada para a página inicial, '
  + 'na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = screen.getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });
  it('1.3- A aplicação é redirecionada para a página de About, na URL /about, '
  + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = screen.getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });
  it('1.4- Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na'
   + 'URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favorites = screen.getAllByText(/Favorite pokémons/i);
    const LAST = favorites.length - 1;
    expect(LAST).toBeGreaterThan(0);
    expect(favorites[LAST]).toBeInTheDocument();
  });
  it('1.5- A aplicação é redirecionada para a página Not Found '
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau/1/notFound404');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
