import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar o App', () => {
  test('Teste se o topo da aplicação contém de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const favorPok = screen.getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorPok).toBeInTheDocument();
  });

  test('Teste o redirecionamento para a Home.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const aboutAll = screen.getByText(/Encountered pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Teste o redirecionamento para o About.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = screen.getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Teste o redirecionamento para o Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const aboutAll = screen.getByText(/Favorite pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Renderiza mensagem de "Página não encontrada"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
