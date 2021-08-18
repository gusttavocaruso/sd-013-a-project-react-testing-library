import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Verifica App.js ', () => {
  test('Verifica se exite um link para pagina Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,

    );
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);
  });

  test('Verifica se exite um link para pagina About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,

    );
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);
  });

  test('Verifica se exite um link para pagina Favorite Pokémons', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,

    );
    const linkFavoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavoritePokémons).toBeInTheDocument();
    userEvent.click(linkFavoritePokémons);
  });
});
