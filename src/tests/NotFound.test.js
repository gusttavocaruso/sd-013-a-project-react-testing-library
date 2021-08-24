import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente NotFound', () => {
  it('Teste se pág contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const texth2 = screen.getByRole('heading', { level: 2 });
    expect(texth2.textContent).toMatch('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText('Pikachu crying because the page requested '
    + 'was not found');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
