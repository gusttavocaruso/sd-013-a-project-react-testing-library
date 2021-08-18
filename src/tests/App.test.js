import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe("1- Testando se o topo da aplicação contém um conjunto fixo de links de navegação.", () => {
  it("O primeiro link deve possuir o texto Home.", () => {
    renderWithRouter(<App />);
    const navBar = screen.getByRole('link');
    expect(navBar).toBeInTheDocument();
    console.log(navBar);
  });
});
