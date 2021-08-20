import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<BrowserRouter><About /></BrowserRouter>);

  const headingText = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });
  expect(headingText).toBeInTheDocument();
});

test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  render(<BrowserRouter><About /></BrowserRouter>);

  const p1 = screen.getByText(/This application/i);
  expect(p1).toBeVisible();

  const p2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(p2).toBeVisible();
});

test('se a página contém a seguinte imagem de uma Pokédex', () => {
  render(<BrowserRouter><About /></BrowserRouter>);

  const imageURL = screen.getByRole('img');
  expect(imageURL).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
