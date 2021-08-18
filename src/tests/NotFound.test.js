import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do notFound', () => {
  it('Página possui um h2 com o texto Page requested not found ', () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found /,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  it('testa se tem imagem', () => {
    render(<NotFound />);
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
