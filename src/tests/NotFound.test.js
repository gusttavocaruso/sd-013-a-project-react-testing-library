import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando Componente "NotFound"', () => {
  beforeEach(() => { renderWithRouter(<NotFound />); });
  test('Teste se a página contém "Page requested not found Crying emoji"', () => {
    const aboutText = screen.getByRole('heading', {
      name: /Page requested not found Crying emoji/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem do Sad Pikachu.', () => {
    const aboutImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
