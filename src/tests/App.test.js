import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes da aplicação.', () => {
  test('Testa se o primeiro link possui o texto Home.', () => {
    renderWithRouter(<App />);

    const getHome = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(getHome);
    expect(getHome).toBeInTheDocument();
  });

  test('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);

    const getAbout = screen.getByRole('link', { name: /About/i });
    fireEvent.click(getAbout);
    expect(getAbout).toBeInTheDocument();
  });

  test('Testa se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const getFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(getFavorite);
    expect(getFavorite).toBeInTheDocument();
  });

  test('Testa se o app é redirecionado a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/test');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
