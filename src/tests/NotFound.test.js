import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/rota-que-nao-existe');

  const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFound).toBeVisible();
});

test('se página mostra um gif do pikachu', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/rota-que-nao-existe');

  const pikachuGif = screen.getByAltText(/Pikachu crying because the page/i);
  expect(pikachuGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
