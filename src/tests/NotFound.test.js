import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Quarto requisito: Not Found', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Verifica se a página contém uma h2', () => {
    const heading = screen.getByRole('heading', { name: /Page requested/i });
    expect(heading).toBeInTheDocument();
  });
  it('Verifica se a img tem a src especificadas', () => {
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(img.src).toStrictEqual(src);
  });
});
