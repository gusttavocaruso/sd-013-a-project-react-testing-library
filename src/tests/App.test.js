import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente <App />', () => {
  test('topo da aplicação deve conter um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkGroup = screen.getAllByRole('link');
    const textArray = ['Home', 'About', 'Favorite Pokémons'];
    textArray.forEach((text, index) => {
      expect(linkGroup[index]).toBeInTheDocument();
      expect(linkGroup[index].textContent).toBe(text);
    });
  });

  test('clicar no link Home redireciona para a página inicial "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('clicar no link About redireciona para a página "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('clicar no link Favorite Pokémons redireciona para a página "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('url desconhecida redireciona para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldesconhecida');

    const titleNotFound = screen.getByRole('heading', {
      name: /not found/i,
    });
    expect(titleNotFound).toBeInTheDocument();
  });
});
