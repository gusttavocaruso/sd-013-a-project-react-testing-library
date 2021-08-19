import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import { NotFound } from '../components';

describe('Verifica App.js ', () => {
  test('Verifica se exitem links para as paginas Home, About e Favorite', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,

    );
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);

    const linkFavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavoritePokémons).toBeInTheDocument();
    userEvent.click(linkFavoritePokémons);
  });
});

describe('verificando mensagem da pagina nao encontrada', () => {
  test('Renderiza mensagem de pagina não encontrada', () => {
    const historyMock = createMemoryHistory();

    render(
      <Router history={ historyMock }>
        <NotFound />
      </Router>,
    );
    historyMock.push('/error');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
