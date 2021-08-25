import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Quarto requisito', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Verificar se a página contem <h2 />', () => {
    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('Verificar se o caminho da imagem está correto', () => {
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu crying/i);
    expect(img.src).toStrictEqual(src);
  });
});
