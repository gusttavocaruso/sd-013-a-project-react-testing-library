import { within, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe(' Teste o componente "<App.js />"', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const expected = ['Home', 'About', 'Favorite Pokémons'];

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const navBar = screen.getByRole('navigation');
    const listTextContent = within(navBar).getAllByRole('link')
      .map((i) => i.textContent);
    expect(listTextContent).toStrictEqual(expected);
  });
});
