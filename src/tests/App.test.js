import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Teste do component App', () => {
  it('Testa se o topo da aplicação contém links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada para Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/juliane');
    const { pathname } = history.location;
    expect(pathname).toBe('/juliane');
    const msg = 'Pikachu crying because the page requested was not found';
    const notFoundMsg = screen.getByAltText(msg);
    expect(notFoundMsg).toBeInTheDocument();
  });
});
