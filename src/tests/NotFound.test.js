import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('', () => {
  test('', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/caminhoerrado');

    const notFound = screen.getByRole('heading', { name: /Page requested not/i });
    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying/i });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe(src);
  });
});
