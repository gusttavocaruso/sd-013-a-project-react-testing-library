import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  test('Renderiza o link com o texto "Home", e se clicado renderiza a pagina ', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText('Home')).toBeDefined();
    userEvent.click(screen.getByRole('link', { name: /Home/i }));

    const texth1 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(texth1).toBeInTheDocument();
  });

  test('Renderiza o link com o texto "About" e se clicado renderiza a pagina', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText('About')).toBeDefined();
    userEvent.click(screen.getByRole('link', { name: /About/i }));

    const texth1 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(texth1).toBeInTheDocument();
  });
  test('Renderiza o link com o texto "Favorite Pokémons" e se clicado renderiza', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByText('Favorite Pokémons')).toBeDefined();
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    const texth1 = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(texth1).toBeInTheDocument();
  });
});
