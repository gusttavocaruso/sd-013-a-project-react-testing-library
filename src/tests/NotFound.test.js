import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test notFound page', () => {
  it('should have a H2-heading text there', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/non-valid-url');
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should have a specific image there', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/non-valid-url');
    const notFoundImg = screen.getByRole('img', { name: /pikachu crying/i });
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
