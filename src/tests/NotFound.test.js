import React from 'react';
import { render, screen } from 'react-dom';
import { NotFound } from '../components';

describe('Teste o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', { level: 2 });
    const msg = /requested not found/i;
    expect(h2).toBeInTheDocument();
    expect(msg).toBeInTheDocument();
  });
});
