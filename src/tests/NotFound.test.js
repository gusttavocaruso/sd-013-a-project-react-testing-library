import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  it('checagem da existência de um H2', () => {
    renderWithRouter(<NotFound />);
    const titulo = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    const emoji = screen.getByText(/😭/i);
    expect(emoji).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
  });
  it('checagem da img', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /Pikachu/i });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
