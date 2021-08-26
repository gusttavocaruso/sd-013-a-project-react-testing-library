import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa notfound', () => {
  test('Texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/fseila');
    const heading = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Imagem notfound', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/fseila');
    const alt = 'Pikachu crying because the page requested was not found';
    const imagem = screen.getByAltText(alt);
    expect(imagem.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
