import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo contém um conjunto fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFav = screen.getByRole('link', {
      name: /favorite/i,
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFav).toBeInTheDocument();
  });

  test('Teste ao clicar, redireciona para página inicial ao clicar no link Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const homeHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(homeHeading).toBeInTheDocument();
  });

  test('Test se redirecionada para page About, clicando no link About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Test se redirecionada para page Favoritados, clicando no link favorites', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFav).toBeInTheDocument();

    userEvent.click(linkFav);

    const favHeading = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(favHeading).toBeInTheDocument();
  });
});
