import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  test('Exibe um heading com um texto', () => {
    render(<NotFound />);

    const heading1 = screen.getByRole('heading');
    expect(heading1.textContent).toBe('Page requested not found 😭'); // confere de o texto dentro do heading faz mach com o texto passado dentro do toBe.
  }); // .textContent = conteudo de texto de um nó e dos seus descendentes.

  test('Contém uma imagem', () => {
    render(<NotFound />);

    const image2 = screen
      .getByAltText(/Pikachu crying because/i);

    expect(image2).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // confere se dentro da const image2 existe o atributo src, com o link descrito.
    expect(image2).toBeInTheDocument();
  });
});
