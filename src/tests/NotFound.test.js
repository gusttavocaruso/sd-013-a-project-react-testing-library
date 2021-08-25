import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('NotFound.js', () => {
  test('Verifica se contém um heading `h2` `Page requested not found 😭`', () => {
    render(<NotFound />);

    const notFond = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFond).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.', () => {
    render(<NotFound />);

    const NotFondError = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(NotFondError.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
