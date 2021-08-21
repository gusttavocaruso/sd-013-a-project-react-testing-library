import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js.', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const textPage = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(textPage).toBeInTheDocument();
  });

  test('A página deve conter a seguinte imagem de uma Pokédex:', () => {
    render(<NotFound />);
    const imgNotFound = screen.getAllByRole('img');
    expect(imgNotFound[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
