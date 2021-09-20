import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component App', () => {
  test('Teste se é redirecionado para a página inicial.', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {

      name: /home/i,
    });
    userEvent.click(homeLink);
  });

  test(' Teste se é redirecionado para a página de About.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {

      name: /about/i,
    });
    userEvent.click(aboutLink);
  });

  test('Teste se é redirecionado para a página de Pokémons Favoritados.', () => {
    renderWithRouter(<App />);
    const favPokeLink = screen.getByRole('link', {

      name: /Favorite pokémons/i,
    });
    userEvent.click(favPokeLink);
  });

  test('Teste se é redirecionado para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-inexistente-xablau');
  });
});
