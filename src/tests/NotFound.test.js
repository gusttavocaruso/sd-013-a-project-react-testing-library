import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o component NotFound.js', () => {
  test('Se página contém um heading h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);

    const text = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2 });
    expect(text).toBeInTheDocument();
  });
  test('Se página mostra uma imagem específica', () => {
    render(<NotFound />);

    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    expect(img.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
