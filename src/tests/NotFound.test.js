import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  it('Testa se página tem um header com o texto certo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste');
    const header = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(header).toBeInTheDocument();
  });
  it('Testa se página tem um gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste');
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
