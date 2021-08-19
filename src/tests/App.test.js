import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';

const { screen, render, fireEvent } = require('@testing-library/react');

describe('App.test.js', () => {
  test('Verifica que o topo da app contém um conjunto fixo de links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByText('Home');
    const linkAbout = screen.getByText('About');
    const linkFavorite = screen.getByText('Favorite Pokémons');

    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavorite).toBeDefined();
  });

  test('Teste se a app redireciona à página correta ao clicar nos links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByText('Home');

    fireEvent.click(linkHome);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();

    const linkAbout = screen.getByText('About');

    fireEvent.click(linkAbout);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();

    const linkFavorite = screen.getByText('Favorite Pokémons');

    fireEvent.click(linkFavorite);
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });
});
