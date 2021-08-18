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
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const aboutAll = getByText(/Encountered pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Teste o redirecionamento para o About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Teste o redirecionamento para o Favorite Pokémons.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const aboutAll = getByText(/Favorite pokémons/);
    expect(aboutAll).toBeInTheDocument();
  });

  test('Renderiza mensagem de "Página não encontrada"', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
