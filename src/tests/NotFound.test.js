import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the component NotFound', () => {
  it(`Test if the page have a h2 heading
   with the text 'Page requested not found 😭'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-do-not-exist');
    // line 12 to 18 inspired by Matheus Duarte's pull request https://github.com/tryber/sd-013-a-project-react-testing-library/pull/97/files
    const textNotFound = screen.getByRole('heading', {
      level: 2,
    });

    expect(textNotFound).toBeInTheDocument();
    expect(textNotFound).toHaveTextContent(/Page requested not found 😭/i);
  });
  it('Test if the page showes the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-do-not-exist');
    const img = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
