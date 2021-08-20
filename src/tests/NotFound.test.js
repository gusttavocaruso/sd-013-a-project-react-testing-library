import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe(' Teste o componente "<NotFound.js />"', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not'
  + ' found 😭', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem'
  + 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const history = createMemoryHistory();
    const expected = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const imagePage = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imagePage).toBeInTheDocument();
    expect(imagePage.src).toBe(expected);
  });
});
