import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

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
