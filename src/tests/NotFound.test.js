import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testar o NotFound', () => {
  test('Teste se a página contém um <h2> com "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-page');

    const msgNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(msgNotFound).toBeInTheDocument();
  });

  test('Teste se página contém imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comments');
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const logoError = screen.getAllByRole('img');
    // expect(logoError.length).toBe(2);
    expect(logoError[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
