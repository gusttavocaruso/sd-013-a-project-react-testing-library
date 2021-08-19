import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  test('Se a página contém o texto "Page requested not found"', () => {
    render(<NotFound />);
    const textNot = screen.getByRole('heading', { name: /page requested not found/i });
    expect(textNot).toBeInTheDocument();
  });

  test('Se a página contém uma imagem específica', () => {
    render(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { src } = screen.getByAltText(alt);
    expect(src).toBe(url);
  });
});
