import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing Component App', () => {
  beforeEach(() => { renderWithRouter(<App />); }); // <= Adicionando esta função para não repetir a chamada do renderWithRouter em cada test;
  test('Teste se é redirecionado para a página inicial.', () => {
    const homeLink = screen.getByRole('link', {

      name: /home/i,
    });
    userEvent.click(homeLink);
  });

  test(' Teste se é redirecionado para a página de About.', () => {
    const aboutLink = screen.getByRole('link', {

      name: /about/i,
    });
    userEvent.click(aboutLink);
  });

  test('Teste se é redirecionado para a página de Pokémons Favoritados.', () => {
    const favPokeLink = screen.getByRole('link', {

      name: /Favorite pokémons/i,
    });
    userEvent.click(favPokeLink);
  });

  test('Teste se é redirecionado para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-não-existe-XablauNAtion');
  });
});
