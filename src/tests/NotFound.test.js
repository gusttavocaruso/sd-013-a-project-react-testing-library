import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente "NotFound".', () => {
  test('Testa se é exibida a mensagem "Page requested no found".', () => {
    render(<NotFound />);

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });

  test('Testa se a imagem é exibida.', () => {
    render(<NotFound />);

    const image = screen.getByAltText(/pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
