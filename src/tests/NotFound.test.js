import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o component NotFound', () => {
  test('Testa se o component renderiza o texto Page Requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = /page requested not found/i;
    const getText = screen.getByText(text);

    expect(getText).toBeInTheDocument();
  });
  test('Testa se o component renderiza o gif do Pikachu', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because the page/i);
    expect(image.src)
      .toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
