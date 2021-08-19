import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe("1 - Testando se o topo da aplicação contém um conjunto fixo de links de navegação.", () => {
  it("1.1 - O primeiro link deve possuir o texto Home.", () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  it("1.2 - A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação", () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
});
