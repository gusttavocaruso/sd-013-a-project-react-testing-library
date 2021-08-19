import { within, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe(' Teste o componente "<App.js />"', () => {
  describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const exepected = 3;
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const navBarElement = screen.getByRole('navigation');
    const listTextContent = within(navBarElement).getAllByRole('link')
      .map((link) => link.textContent);

    it('Testa se o navBar tem 3 link', () => {
      expect(listTextContent.length).toBe(exepected);
    });
    it('O primeiro link deve possuir o texto Home.', () => {
      expect(listTextContent[0]).toBe('Home');
    });
    it('O primeiro link deve possuir o texto About.', () => {
      expect(listTextContent[1]).toBe('About');
    });
    it('O primeiro link deve possuir o texto Favorite Pokémons.', () => {
      expect(listTextContent[2]).toBe('Favorite Pokémons');
    });
  });
});
