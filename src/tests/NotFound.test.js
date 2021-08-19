import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando componente NotFound.js', () => {
  it('', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-nao-existente');

    const notFoundMessage = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFoundMessage).toBeInTheDocument();
  });
});
