import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <NotFound />', () => {
  it('Verifica se a página contém um <h2/>', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const headingText = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('Verifica se a página contém um <img/>', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/banana');
    const image = screen.getByRole('img', {
      name: /pikachu/i,
    });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
