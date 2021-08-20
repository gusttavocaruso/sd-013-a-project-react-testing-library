import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  test('A página contém o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const text = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

  test('A página mostra a imagem com url específica', () => {
    renderWithRouter(<NotFound />);

    const linkImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getAllByRole('img');

    expect(img[1]).toBeInTheDocument();
    expect(img[1].src).toBe(linkImg);
  });
});
