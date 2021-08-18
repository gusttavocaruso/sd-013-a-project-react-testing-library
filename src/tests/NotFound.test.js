import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test notFound page', () => {
  it('should have a heading text', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/non-valid-url');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should have a image text', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/non-valid-url');

    const notFoundImg = screen.getByRole('img', { name: /pikachu crying/i });
    const { src } = notFoundImg;

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
