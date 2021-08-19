import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Requisito 1', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const navHome = screen.getByText('Home');

    const navAbout = screen.getByText('About');

    const navFav = screen.getByText('Favorite Pokémons');

    expect(navHome).toBeInTheDocument(/home/i);
    expect(navAbout).toBeInTheDocument(/about/i);
    expect(navFav).toBeInTheDocument(/favorite pokémons/i);
  });

  it('A aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const navHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(navHome);
    expect(navHome).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const navAbout = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(navAbout);
    expect(navAbout).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const navFav = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(navFav);
    expect(navFav).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFound = screen.getByRole('heading', {
      name: /Page requested not found /i,
      level: 2,
    });

    expect(history.location.pathname).toBe('/rota-que-nao-existe');
    expect(notFound).toBeInTheDocument();
  });
});
