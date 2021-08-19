import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Teste 1 - App.js', () => {
  test('5 casos - Testa se contém um conj. fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorite = screen.getByRole('link', { name: /favorite/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
});
