import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente app', () => {
  test('testa o texto dos links do component app', () => {
    renderWithRouter(<App />);

    const firstLink = screen.getByText(/home/i);
    const secondLink = screen.getByText(/about/i);
    const thirdLink = screen.getByText(/Favorite Pokémons/i);
    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });
  test('Testando as rotas dos links do component app', () => {
    const { history } = renderWithRouter(<App />);

    const firstLink = screen.getByText(/home/i);
    fireEvent.click(firstLink);
    expect(history.location.pathname).toBe('/');

    const secondLink = screen.getByText(/about/i);
    fireEvent.click(secondLink);
    expect(history.location.pathname).toBe('/about');

    const thirdLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(thirdLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('banana');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
