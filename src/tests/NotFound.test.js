import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('teste o componente "NotFound.js"', () => {
  test('teste se pág. contém um heading h2 com texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  test('teste se a pag. mostra a "img-gif"', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/not-Found');
    const img = screen.getByAltText(/Pikachu/);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toBeInTheDocument();
  });
});
