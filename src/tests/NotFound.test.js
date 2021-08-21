import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste se NotFound renderiza h2 com texto', () => {
  it('Texto: Page requested not found 😭', () => {
    render(<NotFound />);
    const texto = screen.getByRole('heading', {
      level: 2,
    });
    expect(texto.textContent).toBe('Page requested not found 😭');
  });
  it('Testa se a página contém uma imagem específica', () => {
    render(<NotFound />);
    const elementosImg = screen.getAllByRole('img');
    expect(elementosImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
