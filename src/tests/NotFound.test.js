import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Verifica se contem um texto h2 Page requested not found 😭', () => {
  render(<NotFound />);
  const noFavorite = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(noFavorite).toBeInTheDocument();
});

test('Verifica se contem uma imagem', () => {
  render(<NotFound />);
  const img = screen.getAllByRole('img')[1];
  expect(img.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
