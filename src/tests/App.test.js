import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';

describe(' Teste o componente "<App.js />"', () => {
  describe('Teste se o topo da aplicação contém um conjunto fixo de links.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // Pega o tag nav
    const navBarElement = screen.getByRole('navigation');
    // Retorna uma lista com os nomes que estao na tag nav
    const listTextContent = within(navBarElement).getAllByRole('link')
      .map((link) => link.textContent);
    it('Testa se existe uma tag nav', () => {
      expect(navBarElement).toBeInTheDocument();
    });
    it('O primeiro link deve possuir o texto Home.', () => {
      expect(listTextContent[0]).toBe('Home');
    });
    it('O segundo link deve possuir o texto About.', () => {
      expect(listTextContent[1]).toBe('About');
    });
    it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      expect(listTextContent[2]).toBe('Favorite Pokémons');
    });
  });
});

describe('Teste os links de navegação.', () => {
  describe('Testa os Links Home, About, Favorite Pokémons e NotFound', () => {
    it('Ao clicar no link Home redirecionada para URL "/"', () => {
      const history = createMemoryHistory();
      const expected = '/';
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const home = screen.getByRole('link', { name: 'Home' });
      userEvent.click(home);
      const homeAll = screen.getByRole('heading', { level: 2 });

      expect(homeAll).toBeInTheDocument();
      expect(homeAll.textContent).toMatch('Encountered pokémons');
      expect(history.location.pathname).toBe(expected);
    });

    it('Ao clicar no link About redirecionada para URL "/about"', () => {
      const history = createMemoryHistory();
      const expected = '/about';
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const home = screen.getByRole('link', { name: 'About' });
      userEvent.click(home);
      const homeAll = screen.getByRole('heading', { level: 2 });

      expect(homeAll).toBeInTheDocument();
      expect(homeAll.textContent).toBe('About Pokédex');
      expect(history.location.pathname).toBe(expected);
    });

    it('Ao clicar no link Favorite Pokémons redirecionada para URL "/favorites"', () => {
      const history = createMemoryHistory();
      const expected = '/favorites';
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      const home = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(home);
      const homeAll = screen.getByRole('heading', { level: 2 });

      expect(homeAll).toBeInTheDocument();
      expect(homeAll.textContent).toMatch('Favorite pokémons');
      expect(history.location.pathname).toBe(expected);
    });

    it('Ao digita um URL invalida redirecionada para página "Not Found"', () => {
      const history = createMemoryHistory();
      const expected = '/pagina-que/nao-existe';
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );

      history.push(expected);
      const homeAll = screen.getByRole('heading', { level: 2 });

      expect(homeAll).toBeInTheDocument();
      expect(homeAll.textContent).toMatch('Page requested not found 😭');
      expect(history.location.pathname).toBe(expected);
    });
  });
});
