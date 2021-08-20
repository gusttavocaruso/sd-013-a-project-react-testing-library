import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Conjunto dedicado a textos e se os itens estão presentes na página', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });
});

describe('Conjunto de testes dos links de navegação', () => {
  test('Teste de redirecionamento do link Home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste de redirecionamento do link About', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste de redirecionamento do link Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste de redirecionamento quando nenhuma página é encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-qualquer');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
