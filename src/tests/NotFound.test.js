import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing \'NotFound\' component', () => {
  it('should render \'a not found page\' with an \'h2\'', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/oksdakosdakodkodsakosadko');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should render \'a not found page\' with an image', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/oksdakosdakodkodsakosadko');

    const notFoundImage = screen.getByRole('img', { name: /pikachu crying/i });

    // Sugestão do Cássio da turma 13 - a
    const { src } = notFoundImage;

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
